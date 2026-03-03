import { memo, useMemo } from "react";
import { MenuItem, CustomerInfo } from "../types";
import { getCurrentStep, isStepDone } from "../utils/stepStatus";

interface ConfirmBarProps {
  readonly menuItems: readonly MenuItem[];
  readonly selectedDate: string | null;
  readonly selectedTime: string | null;
  readonly customer: CustomerInfo;
  readonly canConfirm: boolean;
  readonly onConfirm: () => void;
}

const STEPS = [1, 2, 3] as const;

export const ConfirmBar = memo(function ConfirmBar({
  menuItems,
  selectedDate,
  selectedTime,
  customer,
  canConfirm,
  onConfirm,
}: ConfirmBarProps) {
  const currentStep = useMemo(
    () => getCurrentStep(menuItems, selectedDate, selectedTime, customer),
    [menuItems, selectedDate, selectedTime, customer]
  );

  const totalPrice = useMemo(
    () => menuItems.reduce((s, m) => s + m.price, 0),
    [menuItems]
  );

  return (
    <div className="confirm-bar" role="status" aria-label="予約ステータス">
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
          {STEPS.map((step) => {
            const done = isStepDone(step, menuItems, selectedDate, selectedTime, customer);
            const isActive = step === currentStep;

            const classNames = [
              "step-dot",
              done && "done",
              isActive && "active",
            ]
              .filter(Boolean)
              .join(" ");

            return <div key={step} className={classNames} />;
          })}
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--warm-gray)",
              marginLeft: 8,
              whiteSpace: "nowrap",
            }}
            aria-live="polite"
          >
            {menuItems.length > 0
              ? `¥${totalPrice.toLocaleString()}`
              : "メニューを選択してください"}
          </span>
        </div>
        <button
          className="btn-primary"
          disabled={!canConfirm}
          onClick={onConfirm}
          style={{
            borderRadius: 0,
            padding: "12px 24px",
            fontSize: 13,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          予約内容を確認
        </button>
      </div>
    </div>
  );
});
