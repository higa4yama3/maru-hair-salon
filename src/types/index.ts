export interface Stylist {
  readonly id: number;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly specialties: readonly string[];
  readonly avatar: string;
  readonly years: number;
}

export interface MenuItem {
  readonly id: number;
  readonly category: MenuCategory;
  readonly name: string;
  readonly price: number;
  readonly duration: number;
  readonly description: string;
}

export type MenuCategory = "CUT" | "COLOR" | "PERM" | "TREATMENT" | "OTHER";

export type CategoryFilter = MenuCategory | "ALL";

export interface CustomerInfo {
  readonly name: string;
  readonly phone: string;
  readonly note: string;
}

export interface CustomerErrors {
  readonly name?: string;
  readonly phone?: string;
}

export type BookingStatus =
  | "confirmed"
  | "completed"
  | "cancelled_by_customer"
  | "cancelled_by_owner"
  | "no_show";

export interface Booking {
  readonly id: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly menuItemIds: readonly number[];
  readonly totalDuration: number;
  readonly totalPrice: number;
  readonly customerName: string;
  readonly customerPhone: string;
  readonly customerNote: string;
  readonly status: BookingStatus;
}

export interface BlockedSlot {
  readonly id: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly reason: string;
  readonly isAllDay: boolean;
}

export interface BusinessHours {
  readonly dayOfWeek: number;
  readonly startTime: string;
  readonly endTime: string;
  readonly isHoliday: boolean;
}

export interface SpecialDate {
  readonly date: string;
  readonly startTime: string | null;
  readonly endTime: string | null;
  readonly isClosed: boolean;
  readonly reason: string;
}

export interface BookingData {
  readonly stylist: Stylist | null;
  readonly menuItems: readonly MenuItem[];
  readonly date: string | null;
  readonly time: string | null;
  readonly customer: CustomerInfo;
}
