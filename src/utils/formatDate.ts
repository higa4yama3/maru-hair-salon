export const DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"] as const;

/** "2026-10-02" → "10月2日（金）" */
export function formatDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = new Date(y, m - 1, d).getDay();
  return `${m}月${d}日（${DAY_NAMES[dow]}）`;
}
