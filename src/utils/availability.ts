import type { Booking, BlockedSlot, BusinessHours, SpecialDate } from "../types";
import { SLOT_INTERVAL_MINUTES, BUFFER_MINUTES } from "../constants/schedule";

export interface AvailabilityConfig {
  readonly slotIntervalMinutes: number;
  readonly bufferMinutes: number;
}

const DEFAULT_CONFIG: AvailabilityConfig = {
  slotIntervalMinutes: SLOT_INTERVAL_MINUTES,
  bufferMinutes: BUFFER_MINUTES,
};

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function isOverlapping(
  a1: number,
  a2: number,
  b1: number,
  b2: number
): boolean {
  return a1 < b2 && b1 < a2;
}

function getDayOfWeek(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y!, m! - 1, d!).getDay();
}

export function getBusinessHoursForDate(
  date: string,
  businessHours: readonly BusinessHours[],
  specialDates: readonly SpecialDate[]
): { readonly start: string; readonly end: string } | null {
  const special = specialDates.find((s) => s.date === date);
  if (special) {
    if (special.isClosed || special.startTime === null || special.endTime === null) {
      return null;
    }
    return { start: special.startTime, end: special.endTime };
  }

  const dow = getDayOfWeek(date);
  const bh = businessHours.find((h) => h.dayOfWeek === dow);
  if (!bh || bh.isHoliday) {
    return null;
  }
  return { start: bh.startTime, end: bh.endTime };
}

function getConfirmedBookingsForDate(
  date: string,
  bookings: readonly Booking[]
): readonly Booking[] {
  return bookings.filter(
    (b) => b.date === date && b.status === "confirmed"
  );
}

function getBlockedSlotsForDate(
  date: string,
  blockedSlots: readonly BlockedSlot[]
): readonly BlockedSlot[] {
  return blockedSlots.filter((b) => b.date === date);
}

export function getAvailableSlots(
  date: string,
  totalDuration: number,
  bookings: readonly Booking[],
  blockedSlots: readonly BlockedSlot[],
  businessHours: readonly BusinessHours[],
  specialDates: readonly SpecialDate[],
  config: AvailabilityConfig = DEFAULT_CONFIG
): readonly string[] {
  const hours = getBusinessHoursForDate(date, businessHours, specialDates);
  if (!hours || totalDuration <= 0) {
    return [];
  }

  const startMin = timeToMinutes(hours.start);
  const endMin = timeToMinutes(hours.end);
  const lastStartMin = endMin - totalDuration;
  if (lastStartMin < startMin) {
    return [];
  }

  const { slotIntervalMinutes, bufferMinutes } = config;
  const dayBookings = getConfirmedBookingsForDate(date, bookings);
  const dayBlocks = getBlockedSlotsForDate(date, blockedSlots);

  const hasAllDayBlock = dayBlocks.some((b) => b.isAllDay);
  if (hasAllDayBlock) {
    return [];
  }

  const result: string[] = [];
  for (let slotStart = startMin; slotStart <= lastStartMin; slotStart += slotIntervalMinutes) {
    const slotEnd = slotStart + totalDuration;

    const conflictsWithBooking = dayBookings.some((b) => {
      const bStart = timeToMinutes(b.startTime) - bufferMinutes;
      const bEnd = timeToMinutes(b.endTime) + bufferMinutes;
      return isOverlapping(slotStart, slotEnd, bStart, bEnd);
    });

    const conflictsWithBlock = dayBlocks.some((b) => {
      const bStart = timeToMinutes(b.startTime);
      const bEnd = timeToMinutes(b.endTime);
      return isOverlapping(slotStart, slotEnd, bStart, bEnd);
    });

    if (!conflictsWithBooking && !conflictsWithBlock) {
      result.push(minutesToTime(slotStart));
    }
  }
  return result;
}

export function hasAnySlot(
  date: string,
  totalDuration: number,
  bookings: readonly Booking[],
  blockedSlots: readonly BlockedSlot[],
  businessHours: readonly BusinessHours[],
  specialDates: readonly SpecialDate[],
  config: AvailabilityConfig = DEFAULT_CONFIG
): boolean {
  const slots = getAvailableSlots(
    date,
    totalDuration,
    bookings,
    blockedSlots,
    businessHours,
    specialDates,
    config
  );
  return slots.length > 0;
}
