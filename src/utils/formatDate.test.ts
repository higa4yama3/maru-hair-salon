import { formatDateLabel } from "./formatDate";

describe("formatDateLabel", () => {
  it("formats month, day and weekday in Japanese", () => {
    expect(formatDateLabel("2026-10-02")).toBe("10月2日（金）");
  });

  it("drops leading zeros", () => {
    expect(formatDateLabel("2027-01-05")).toBe("1月5日（火）");
  });
});
