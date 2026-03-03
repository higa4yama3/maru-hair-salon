import {
  timeToMinutes,
  minutesToTime,
  isOverlapping,
  getBusinessHoursForDate,
  getAvailableSlots,
  hasAnySlot,
} from "./availability";
import { DEFAULT_BUSINESS_HOURS } from "../constants/schedule";

describe("timeToMinutes", () => {
  it("converts HH:mm to minutes from midnight", () => {
    expect(timeToMinutes("00:00")).toBe(0);
    expect(timeToMinutes("10:00")).toBe(600);
    expect(timeToMinutes("14:30")).toBe(870);
    expect(timeToMinutes("23:59")).toBe(1439);
  });
});

describe("minutesToTime", () => {
  it("converts minutes to HH:mm", () => {
    expect(minutesToTime(0)).toBe("00:00");
    expect(minutesToTime(600)).toBe("10:00");
    expect(minutesToTime(870)).toBe("14:30");
    expect(minutesToTime(1439)).toBe("23:59");
  });
});

describe("timeToMinutes / minutesToTime roundtrip", () => {
  it("preserves value through roundtrip", () => {
    const times = ["00:00", "09:30", "12:00", "18:45", "23:59"];
    for (const t of times) {
      expect(minutesToTime(timeToMinutes(t))).toBe(t);
    }
  });
});

describe("isOverlapping", () => {
  it("returns true when intervals overlap", () => {
    expect(isOverlapping(10, 12, 11, 13)).toBe(true);
    expect(isOverlapping(11, 13, 10, 12)).toBe(true);
    expect(isOverlapping(10, 13, 11, 12)).toBe(true);
  });

  it("returns false when intervals do not overlap", () => {
    expect(isOverlapping(10, 11, 11, 12)).toBe(false);
    expect(isOverlapping(11, 12, 10, 11)).toBe(false);
    expect(isOverlapping(10, 12, 13, 15)).toBe(false);
  });

  it("returns false for touching intervals (no overlap)", () => {
    expect(isOverlapping(10, 11, 11, 12)).toBe(false);
    expect(isOverlapping(11, 12, 10, 11)).toBe(false);
  });

  it("returns true when one interval contains the other", () => {
    expect(isOverlapping(10, 12, 11, 11)).toBe(true);
  });
});

describe("getBusinessHoursForDate", () => {
  const businessHours = [...DEFAULT_BUSINESS_HOURS];

  it("returns null for Tuesday (closed)", () => {
    expect(getBusinessHoursForDate("2026-02-24", businessHours, [])).toBeNull();
  });

  it("returns hours for Monday", () => {
    const result = getBusinessHoursForDate("2026-02-23", businessHours, []);
    expect(result).toEqual({ start: "10:00", end: "20:00" });
  });

  it("returns hours for Sunday (short)", () => {
    const result = getBusinessHoursForDate("2026-02-22", businessHours, []);
    expect(result).toEqual({ start: "10:00", end: "16:00" });
  });

  it("returns hours for Saturday", () => {
    const result = getBusinessHoursForDate("2026-02-21", businessHours, []);
    expect(result).toEqual({ start: "09:00", end: "18:00" });
  });

  it("prioritizes special date over regular schedule", () => {
    const specialDates = [
      {
        date: "2026-02-23",
        startTime: "09:00",
        endTime: "12:00",
        isClosed: false,
        reason: "午前のみ",
      },
    ];
    const result = getBusinessHoursForDate(
      "2026-02-23",
      businessHours,
      specialDates
    );
    expect(result).toEqual({ start: "09:00", end: "12:00" });
  });

  it("returns null for special closed date", () => {
    const specialDates = [
      {
        date: "2026-02-23",
        startTime: null,
        endTime: null,
        isClosed: true,
        reason: "休業",
      },
    ];
    const result = getBusinessHoursForDate(
      "2026-02-23",
      businessHours,
      specialDates
    );
    expect(result).toBeNull();
  });
});

describe("getAvailableSlots", () => {
  const businessHours = [...DEFAULT_BUSINESS_HOURS];
  const specialDates: readonly never[] = [];

  it("returns empty when totalDuration is 0", () => {
    const slots = getAvailableSlots(
      "2026-02-23",
      0,
      [],
      [],
      businessHours,
      specialDates
    );
    expect(slots).toEqual([]);
  });

  it("returns empty for closed day (Tuesday)", () => {
    const slots = getAvailableSlots(
      "2026-02-24",
      60,
      [],
      [],
      businessHours,
      specialDates
    );
    expect(slots).toEqual([]);
  });

  it("excludes slots overlapping with lunch block (13:00-14:00)", () => {
    const blockedSlots = [
      {
        id: "lunch",
        date: "2026-02-23",
        startTime: "13:00",
        endTime: "14:00",
        reason: "昼休憩",
        isAllDay: false,
      },
    ];
    const slots = getAvailableSlots(
      "2026-02-23",
      60,
      [],
      blockedSlots,
      businessHours,
      specialDates
    );
    expect(slots).not.toContain("12:30");
    expect(slots).not.toContain("13:00");
    expect(slots).not.toContain("13:30");
    expect(slots).toContain("14:00");
    expect(slots).toContain("12:00");
  });

  it("excludes slots overlapping with existing booking", () => {
    const bookings = [
      {
        id: "b1",
        date: "2026-02-23",
        startTime: "11:00",
        endTime: "12:00",
        menuItemIds: [1],
        totalDuration: 60,
        totalPrice: 5500,
        customerName: "山田",
        customerPhone: "090-1234-5678",
        customerNote: "",
        status: "confirmed" as const,
      },
    ];
    const slots = getAvailableSlots(
      "2026-02-23",
      60,
      bookings,
      [],
      businessHours,
      specialDates
    );
    expect(slots).not.toContain("10:30");
    expect(slots).not.toContain("11:00");
    expect(slots).not.toContain("11:30");
    expect(slots).not.toContain("12:00");
    expect(slots).toContain("12:30");
  });

  it("returns empty for all-day block", () => {
    const blockedSlots = [
      {
        id: "private",
        date: "2026-02-23",
        startTime: "00:00",
        endTime: "23:59",
        reason: "私用",
        isAllDay: true,
      },
    ];
    const slots = getAvailableSlots(
      "2026-02-23",
      60,
      [],
      blockedSlots,
      businessHours,
      specialDates
    );
    expect(slots).toEqual([]);
  });

  it("respects buffer between bookings", () => {
    const bookings = [
      {
        id: "b1",
        date: "2026-02-23",
        startTime: "11:00",
        endTime: "12:00",
        menuItemIds: [1],
        totalDuration: 60,
        totalPrice: 5500,
        customerName: "山田",
        customerPhone: "090-1234-5678",
        customerNote: "",
        status: "confirmed" as const,
      },
    ];
    const slots = getAvailableSlots(
      "2026-02-23",
      60,
      bookings,
      [],
      businessHours,
      specialDates
    );
    expect(slots).not.toContain("10:30");
    expect(slots).not.toContain("11:00");
    expect(slots).not.toContain("12:00");
    expect(slots).toContain("12:30");
  });
});

describe("hasAnySlot", () => {
  const businessHours = [...DEFAULT_BUSINESS_HOURS];
  const specialDates: readonly never[] = [];

  it("returns true when slots exist", () => {
    expect(
      hasAnySlot("2026-02-23", 60, [], [], businessHours, specialDates)
    ).toBe(true);
  });

  it("returns false for closed day", () => {
    expect(
      hasAnySlot("2026-02-24", 60, [], [], businessHours, specialDates)
    ).toBe(false);
  });

  it("returns false when totalDuration is 0", () => {
    expect(
      hasAnySlot("2026-02-23", 0, [], [], businessHours, specialDates)
    ).toBe(false);
  });

  it("returns false for all-day block", () => {
    const blockedSlots = [
      {
        id: "private",
        date: "2026-02-23",
        startTime: "00:00",
        endTime: "23:59",
        reason: "私用",
        isAllDay: true,
      },
    ];
    expect(
      hasAnySlot(
        "2026-02-23",
        60,
        [],
        blockedSlots,
        businessHours,
        specialDates
      )
    ).toBe(false);
  });
});
