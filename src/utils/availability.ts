import { Availability } from "../types";

const BUSINESS_HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19] as const;
const CLOSED_DAY = 2; // Tuesday
const SLOT_PROBABILITY = 0.35;

export function generateAvailability(
  year: number,
  month: number
): Availability {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const entries = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    .filter((d) => new Date(year, month, d).getDay() !== CLOSED_DAY)
    .map((d) => {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const slots = BUSINESS_HOURS
        .filter(() => Math.random() > SLOT_PROBABILITY)
        .map((h) => `${h}:00`);
      return [key, slots] as const;
    });

  return Object.fromEntries(entries);
}
