import { z } from "zod";
import { CustomerInfo, CustomerErrors } from "../types";

const PHONE_REGEX = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/;

export const customerSchema = z.object({
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .max(50, "お名前は50文字以内で入力してください"),
  phone: z
    .string()
    .min(1, "電話番号を入力してください")
    .regex(PHONE_REGEX, "電話番号の形式が正しくありません"),
  note: z
    .string()
    .max(500, "備考は500文字以内で入力してください"),
});

export function validateCustomer(info: CustomerInfo): CustomerErrors {
  const result = customerSchema.safeParse(info);

  if (result.success) {
    return {};
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as string;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
}

export function hasValidationErrors(errors: CustomerErrors): boolean {
  return Boolean(errors.name || errors.phone);
}
