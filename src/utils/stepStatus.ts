import { MenuItem, CustomerInfo } from "../types";

const TOTAL_STEPS = 3;

export function getCurrentStep(
  menuItems: readonly MenuItem[],
  selectedDate: string | null,
  selectedTime: string | null,
  customer: CustomerInfo
): number {
  if (menuItems.length === 0) return 1;
  if (!selectedDate || !selectedTime) return 2;
  if (!customer.name || !customer.phone) return 3;
  return TOTAL_STEPS;
}

export function isStepDone(
  step: number,
  menuItems: readonly MenuItem[],
  selectedDate: string | null,
  selectedTime: string | null,
  customer: CustomerInfo
): boolean {
  switch (step) {
    case 1:
      return menuItems.length > 0;
    case 2:
      return Boolean(selectedDate) && Boolean(selectedTime);
    case 3:
      return Boolean(customer.name) && Boolean(customer.phone);
    default:
      return false;
  }
}
