import { validateCustomer, hasValidationErrors, customerSchema } from "./validation";
import { CustomerInfo } from "../types";

describe("customerSchema", () => {
  it("accepts valid customer info", () => {
    const input = { name: "山田 太郎", phone: "090-1234-5678", note: "" };
    const result = customerSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const input = { name: "", phone: "090-1234-5678", note: "" };
    const result = customerSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding 50 characters", () => {
    const input = { name: "あ".repeat(51), phone: "090-1234-5678", note: "" };
    const result = customerSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects empty phone", () => {
    const input = { name: "山田", phone: "", note: "" };
    const result = customerSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone format", () => {
    const input = { name: "山田", phone: "abcdefg", note: "" };
    const result = customerSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts phone without hyphens", () => {
    const input = { name: "山田", phone: "09012345678", note: "" };
    const result = customerSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts landline numbers", () => {
    const input = { name: "山田", phone: "03-1234-5678", note: "" };
    const result = customerSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects note exceeding 500 characters", () => {
    const input = { name: "山田", phone: "090-1234-5678", note: "あ".repeat(501) };
    const result = customerSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("validateCustomer", () => {
  const validCustomer: CustomerInfo = {
    name: "山田 太郎",
    phone: "090-1234-5678",
    note: "",
  };

  it("returns empty object for valid input", () => {
    const errors = validateCustomer(validCustomer);
    expect(errors).toEqual({});
  });

  it("returns name error when name is empty", () => {
    const errors = validateCustomer({ ...validCustomer, name: "" });
    expect(errors.name).toBe("お名前を入力してください");
  });

  it("returns phone error when phone is empty", () => {
    const errors = validateCustomer({ ...validCustomer, phone: "" });
    expect(errors.phone).toBe("電話番号を入力してください");
  });

  it("returns phone format error for invalid phone", () => {
    const errors = validateCustomer({ ...validCustomer, phone: "invalid" });
    expect(errors.phone).toBe("電話番号の形式が正しくありません");
  });

  it("returns multiple errors at once", () => {
    const errors = validateCustomer({ name: "", phone: "", note: "" });
    expect(errors.name).toBeDefined();
    expect(errors.phone).toBeDefined();
  });

  it("returns only first error per field", () => {
    const errors = validateCustomer({ ...validCustomer, name: "" });
    expect(typeof errors.name).toBe("string");
  });
});

describe("hasValidationErrors", () => {
  it("returns false for empty errors", () => {
    expect(hasValidationErrors({})).toBe(false);
  });

  it("returns true when name error exists", () => {
    expect(hasValidationErrors({ name: "エラー" })).toBe(true);
  });

  it("returns true when phone error exists", () => {
    expect(hasValidationErrors({ phone: "エラー" })).toBe(true);
  });

  it("returns true when both errors exist", () => {
    expect(hasValidationErrors({ name: "エラー", phone: "エラー" })).toBe(true);
  });
});
