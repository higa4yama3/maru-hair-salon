import { MenuItem, CategoryFilter } from "../types";

export const MENU: readonly MenuItem[] = [
  { id: 1, category: "CUT", name: "カット", price: 5500, duration: 60, description: "シャンプー・ブロー込み" },
  { id: 2, category: "CUT", name: "メンズカット", price: 4500, duration: 45, description: "シャンプー・スタイリング込み" },
  { id: 3, category: "CUT", name: "前髪カット", price: 1100, duration: 15, description: "前髪のみ" },
  { id: 4, category: "COLOR", name: "カラー", price: 7700, duration: 90, description: "リタッチ〜フルカラー" },
  { id: 5, category: "COLOR", name: "ハイライト", price: 5500, duration: 60, description: "部分ハイライト" },
  { id: 6, category: "COLOR", name: "ダブルカラー", price: 13200, duration: 120, description: "ブリーチ＋カラー" },
  { id: 7, category: "PERM", name: "パーマ", price: 8800, duration: 90, description: "コールド/デジタル" },
  { id: 8, category: "TREATMENT", name: "ヘッドスパ", price: 4400, duration: 40, description: "頭皮ケア＆リラックス" },
  { id: 9, category: "TREATMENT", name: "トリートメント", price: 3300, duration: 30, description: "ダメージ補修" },
  { id: 10, category: "OTHER", name: "眉カット", price: 1100, duration: 15, description: "眉デザイン" },
];

export const CATEGORIES: readonly CategoryFilter[] = [
  "ALL",
  "CUT",
  "COLOR",
  "PERM",
  "TREATMENT",
  "OTHER",
];

export const CATEGORY_LABELS: Readonly<Record<CategoryFilter, string>> = {
  ALL: "すべて",
  CUT: "カット",
  COLOR: "カラー",
  PERM: "パーマ",
  TREATMENT: "ケア",
  OTHER: "その他",
};
