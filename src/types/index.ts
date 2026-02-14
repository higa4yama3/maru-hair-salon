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

export type Availability = Readonly<Record<string, readonly string[]>>;

export interface BookingData {
  readonly stylist: Stylist | null;
  readonly menuItems: readonly MenuItem[];
  readonly date: string | null;
  readonly time: string | null;
  readonly customer: CustomerInfo;
}
