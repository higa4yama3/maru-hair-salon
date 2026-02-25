import type { Booking, BlockedSlot } from "../types";

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(d: Date, days: number): Date {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDemoBookings(): Booking[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const d1 = addDays(today, 1);
  const d2 = addDays(today, 2);
  const d3 = addDays(today, 4);
  const d4 = addDays(today, 5);

  return [
    {
      id: "demo-b1",
      date: formatDate(d1),
      startTime: "10:00",
      endTime: "11:00",
      menuItemIds: [1],
      totalDuration: 60,
      totalPrice: 5500,
      customerName: "山田 花子",
      customerPhone: "090-1234-5678",
      customerNote: "",
      status: "confirmed",
    },
    {
      id: "demo-b2",
      date: formatDate(d1),
      startTime: "15:00",
      endTime: "16:15",
      menuItemIds: [2, 9],
      totalDuration: 75,
      totalPrice: 7800,
      customerName: "佐藤 太郎",
      customerPhone: "03-1234-5678",
      customerNote: "",
      status: "confirmed",
    },
    {
      id: "demo-b3",
      date: formatDate(d2),
      startTime: "11:00",
      endTime: "13:00",
      menuItemIds: [1, 5],
      totalDuration: 120,
      totalPrice: 11000,
      customerName: "鈴木 美咲",
      customerPhone: "080-9876-5432",
      customerNote: "前回ショートボブ",
      status: "confirmed",
    },
    {
      id: "demo-b4",
      date: formatDate(d3),
      startTime: "10:00",
      endTime: "11:30",
      menuItemIds: [4],
      totalDuration: 90,
      totalPrice: 7700,
      customerName: "田中 健一",
      customerPhone: "090-1111-2222",
      customerNote: "",
      status: "confirmed",
    },
    {
      id: "demo-b5",
      date: formatDate(d4),
      startTime: "14:30",
      endTime: "15:10",
      menuItemIds: [8],
      totalDuration: 40,
      totalPrice: 4400,
      customerName: "高橋 由美",
      customerPhone: "03-5555-6666",
      customerNote: "",
      status: "confirmed",
    },
  ];
}

export function getDemoBlockedSlots(): BlockedSlot[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lunchBlocks: BlockedSlot[] = [];
  for (let i = 0; i < 60; i++) {
    const d = addDays(today, i);
    lunchBlocks.push({
      id: `demo-lunch-${i}`,
      date: formatDate(d),
      startTime: "13:00",
      endTime: "14:00",
      reason: "昼休憩",
      isAllDay: false,
    });
  }

  const privateDay = addDays(today, 7);
  const allDayBlock: BlockedSlot = {
    id: "demo-private",
    date: formatDate(privateDay),
    startTime: "00:00",
    endTime: "23:59",
    reason: "私用",
    isAllDay: true,
  };

  return [...lunchBlocks, allDayBlock];
}
