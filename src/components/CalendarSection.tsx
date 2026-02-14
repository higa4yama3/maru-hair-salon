import { memo, useState, useMemo, useCallback } from "react";
import { Availability } from "../types";
import { useInView } from "../hooks/useInView";

interface CalendarSectionProps {
  readonly selectedDate: string | null;
  readonly onSelectDate: (date: string) => void;
  readonly selectedTime: string | null;
  readonly onSelectTime: (time: string) => void;
  readonly availability: Availability;
}

const DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"] as const;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export const CalendarSection = memo(function CalendarSection({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  availability,
}: CalendarSectionProps) {
  const { ref, isInView } = useInView();
  const [viewDate, setViewDate] = useState(new Date());
  const today = useMemo(() => new Date(), []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(d);
    return result;
  }, [year, month]);

  const slots = useMemo(
    () => (selectedDate ? availability[selectedDate] ?? [] : []),
    [selectedDate, availability]
  );

  const prevMonth = useCallback(
    () => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)),
    []
  );
  const nextMonth = useCallback(
    () => setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)),
    []
  );

  const todayStr = today.toDateString();

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

      <div className="calendar-layout">
        {/* Calendar grid */}
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
              className="btn-outline"
              style={{ padding: "6px 12px", borderRadius: 0 }}
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
              className="btn-outline"
              style={{ padding: "6px 12px", borderRadius: 0 }}
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
              const hasSlots = (availability[dateStr]?.length ?? 0) > 0;
              const isSelected = selectedDate === dateStr;
              const isClickable = !isPast && !isClosed;

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
                <div
                  key={dateStr}
                  className={classNames}
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
                </div>
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

        {/* Time slots */}
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
                  {slots.map((time) => (
                    <button
                      key={time}
                      className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                      onClick={() => onSelectTime(time)}
                      role="option"
                      aria-selected={selectedTime === time}
                    >
                      {time}
                    </button>
                  ))}
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
                  日付を選択してください
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
