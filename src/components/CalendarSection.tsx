import { memo, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import type { Booking, BlockedSlot, BusinessHours } from "../types";
import {
  getAvailableSlots,
  hasAnySlot,
  timeToMinutes,
  minutesToTime,
} from "../utils/availability";
import { useInView } from "../hooks/useInView";
import { MAX_ADVANCE_MONTHS } from "../constants/schedule";

interface CalendarSectionProps {
  readonly selectedDate: string | null;
  readonly onSelectDate: (date: string) => void;
  readonly selectedTime: string | null;
  readonly onSelectTime: (time: string) => void;
  readonly bookings: readonly Booking[];
  readonly blockedSlots: readonly BlockedSlot[];
  readonly totalDuration: number;
  readonly businessHours: readonly BusinessHours[];
}

const DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"] as const;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const SPECIAL_DATES: readonly never[] = [];

export const CalendarSection = memo(function CalendarSection({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  bookings,
  blockedSlots,
  totalDuration,
  businessHours,
}: CalendarSectionProps) {
  const { ref, isInView } = useInView();
  const [viewDate, setViewDate] = useState(new Date());
  const today = useMemo(() => new Date(), []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const todayNormalized = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const maxViewDate = useMemo(() => {
    const m = new Date(todayNormalized);
    m.setMonth(m.getMonth() + MAX_ADVANCE_MONTHS);
    return m;
  }, [todayNormalized]);

  const canPrevMonth = useMemo(
    () => viewDate > new Date(todayNormalized.getFullYear(), todayNormalized.getMonth(), 1),
    [viewDate, todayNormalized]
  );

  const canNextMonth = useMemo(
    () => viewDate < new Date(maxViewDate.getFullYear(), maxViewDate.getMonth(), 1),
    [viewDate, maxViewDate]
  );

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(d);
    return result;
  }, [year, month]);

  const slots = useMemo(() => {
    if (!selectedDate || totalDuration <= 0) return [];
    return getAvailableSlots(
      selectedDate,
      totalDuration,
      bookings,
      blockedSlots,
      businessHours,
      SPECIAL_DATES
    );
  }, [selectedDate, totalDuration, bookings, blockedSlots, businessHours]);

  const prevMonth = useCallback(() => {
    if (!canPrevMonth) return;
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, [canPrevMonth]);

  const nextMonth = useCallback(() => {
    if (!canNextMonth) return;
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, [canNextMonth]);

  const todayStr = today.toDateString();

  const isMenuUnselected = totalDuration === 0;

  return (
    <section
      ref={ref}
      id="calendar"
      className={`section-pad ${isInView ? "reveal visible" : "reveal"}`}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="calendar-heading"
    >
      <div className="section-bg-number" aria-hidden="true">02</div>

      <div
        className="mono"
        style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--gold)" }}
        aria-hidden="true"
      >
        02
      </div>
      <h2
        id="calendar-heading"
        className="serif"
        style={{
          fontSize: 36,
          fontWeight: 300,
          color: "var(--wood-dark)",
          marginTop: 8,
          letterSpacing: "0.08em",
        }}
      >
        Calendar
      </h2>
      <div className="section-accent-line" aria-hidden="true" />
      <p style={{ fontSize: 14, color: "var(--wood-light)", marginTop: 16 }}>
        ご希望の日時をお選びください
      </p>

      {isMenuUnselected && (
        <p
          style={{
            fontSize: 14,
            color: "var(--warm-gray)",
            marginTop: 8,
            marginBottom: -8,
          }}
        >
          メニューを選択してください
        </p>
      )}

      <div className="calendar-layout">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <button
              onClick={prevMonth}
              disabled={!canPrevMonth}
              className="btn-outline"
              style={{
                padding: "6px 12px",
                borderRadius: 0,
                opacity: canPrevMonth ? 1 : 0.4,
                cursor: canPrevMonth ? "pointer" : "default",
              }}
              aria-label="前の月"
            >
              ←
            </button>
            <div style={{ textAlign: "center" }}>
              <div
                className="serif"
                style={{
                  fontSize: 24,
                  fontWeight: 300,
                  color: "var(--wood-dark)",
                }}
              >
                {MONTH_NAMES[month]}
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--warm-gray)" }}>
                {year}
              </div>
            </div>
            <button
              onClick={nextMonth}
              disabled={!canNextMonth}
              className="btn-outline"
              style={{
                padding: "6px 12px",
                borderRadius: 0,
                opacity: canNextMonth ? 1 : 0.4,
                cursor: canNextMonth ? "pointer" : "default",
              }}
              aria-label="次の月"
            >
              →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 4,
              textAlign: "center",
            }}
            role="grid"
            aria-label={`${year}年${month + 1}月のカレンダー`}
          >
            {DAY_NAMES.map((d, i) => (
              <div
                key={d}
                className="mono"
                style={{
                  fontSize: 10,
                  color:
                    i === 0
                      ? "var(--dried-rose)"
                      : i === 6
                      ? "var(--dried-lavender)"
                      : "var(--warm-gray)",
                  padding: "8px 0",
                  letterSpacing: "0.1em",
                }}
                role="columnheader"
              >
                {d}
              </div>
            ))}
            {days.map((d, i) => {
              if (d === null) return <div key={`e${i}`} />;

              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
              const date = new Date(year, month, d);
              const dow = date.getDay();
              const isClosed = dow === 2;
              const isPast =
                date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isToday = date.toDateString() === todayStr;
              const hasSlots =
                !isMenuUnselected &&
                hasAnySlot(
                  dateStr,
                  totalDuration,
                  bookings,
                  blockedSlots,
                  businessHours,
                  SPECIAL_DATES
                );
              const isSelected = selectedDate === dateStr;
              const isClickable =
                !isMenuUnselected && !isPast && !isClosed && hasSlots;

              const classNames = [
                "cal-day",
                isSelected && "selected",
                isPast && "disabled",
                isClosed && "closed",
                isToday && "today",
                hasSlots && !isPast && !isClosed && "has-slots",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <motion.div
                  key={dateStr}
                  className={classNames}
                  whileTap={isClickable ? { scale: 0.95 } : undefined}
                  onClick={() => isClickable && onSelectDate(dateStr)}
                  onKeyDown={(e) => {
                    if (isClickable && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      onSelectDate(dateStr);
                    }
                  }}
                  role="gridcell"
                  tabIndex={isClickable ? 0 : -1}
                  aria-selected={isSelected}
                  aria-disabled={!isClickable}
                  aria-label={`${month + 1}月${d}日${isClosed ? " 定休日" : isPast ? " 過去の日付" : hasSlots ? " 空きあり" : ""}`}
                  style={{
                    color:
                      dow === 0
                        ? "var(--dried-rose)"
                        : dow === 6
                        ? "var(--dried-lavender)"
                        : undefined,
                  }}
                >
                  {d}
                </motion.div>
              );
            })}
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--gold)",
                }}
                aria-hidden="true"
              />
              <span className="mono" style={{ fontSize: 10, color: "var(--warm-gray)" }}>
                空きあり
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--warm-gray)",
                  textDecoration: "line-through",
                }}
                aria-hidden="true"
              >
                火
              </span>
              <span className="mono" style={{ fontSize: 10, color: "var(--warm-gray)" }}>
                定休日
              </span>
            </div>
          </div>
        </div>

        <div>
          {selectedDate ? (
            <>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  color: "var(--wood-light)",
                  marginBottom: 20,
                  letterSpacing: "0.1em",
                }}
              >
                {selectedDate.replace(/-/g, ".")} の空き状況
              </div>
              {slots.length > 0 ? (
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                  role="listbox"
                  aria-label="時間帯選択"
                >
                  {slots.map((startTime) => {
                    const endTime = minutesToTime(
                      timeToMinutes(startTime) + totalDuration
                    );
                    const label = `${startTime} — ${endTime}`;
                    return (
                      <motion.button
                        key={startTime}
                        className={`time-slot ${selectedTime === startTime ? "selected" : ""}`}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onSelectTime(startTime)}
                        role="option"
                        aria-selected={selectedTime === startTime}
                      >
                        {label}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <p style={{ fontSize: 14, color: "var(--warm-gray)" }}>
                  この日は予約が埋まっています
                </p>
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                opacity: 0.4,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "1px solid var(--cream-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                  aria-hidden="true"
                >
                  <span style={{ fontSize: 18, color: "var(--warm-gray)" }}>←</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--warm-gray)" }}>
                  {isMenuUnselected
                    ? "メニューを選択してください"
                    : "日付を選択してください"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
