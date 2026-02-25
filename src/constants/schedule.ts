import type { BusinessHours } from "../types";

export const DEFAULT_BUSINESS_HOURS: readonly BusinessHours[] = [
  { dayOfWeek: 0, startTime: "10:00", endTime: "16:00", isHoliday: false },
  { dayOfWeek: 1, startTime: "10:00", endTime: "20:00", isHoliday: false },
  { dayOfWeek: 2, startTime: "00:00", endTime: "00:00", isHoliday: true },
  { dayOfWeek: 3, startTime: "10:00", endTime: "20:00", isHoliday: false },
  { dayOfWeek: 4, startTime: "10:00", endTime: "20:00", isHoliday: false },
  { dayOfWeek: 5, startTime: "10:00", endTime: "20:00", isHoliday: false },
  { dayOfWeek: 6, startTime: "09:00", endTime: "18:00", isHoliday: false },
];

export const SLOT_INTERVAL_MINUTES = 30;
export const BUFFER_MINUTES = 15;
export const MAX_ADVANCE_MONTHS = 5;
export const MIN_ADVANCE_HOURS = 4;
