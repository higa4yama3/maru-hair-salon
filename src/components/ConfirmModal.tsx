import { memo, useCallback, useEffect } from "react";
import { BookingData } from "../types";

interface ConfirmModalProps {
  readonly data: BookingData;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

export const ConfirmModal = memo(function ConfirmModal({
  data,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  const totalPrice = data.menuItems.reduce((s, m) => s + m.price, 0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 24,
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "var(--warm-gray)",
            transition: "color 0.2s ease",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
          aria-label="閉じる"
        >
          ×
        </button>

        <div
          className="mono"
          style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--gold)" }}
        >
          CONFIRM
        </div>
        <h3
          id="confirm-title"
          className="serif"
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: "var(--wood-dark)",
            marginTop: 8,
          }}
        >
          ご予約内容
        </h3>

        {/* Decorative line */}
        <div
          style={{
            width: 32,
            height: 1,
            background: "var(--gold)",
            marginTop: 16,
            marginBottom: 28,
          }}
          aria-hidden="true"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--cream-dark)",
              paddingBottom: 12,
            }}
          >
            <span style={{ fontSize: 12, color: "var(--warm-gray)" }}>日時</span>
            <span className="mono" style={{ fontSize: 14 }}>
              {data.date?.replace(/-/g, ".")} {data.time}
            </span>
          </div>
          <div
            style={{
              borderBottom: "1px solid var(--cream-dark)",
              paddingBottom: 12,
            }}
          >
            <span style={{ fontSize: 12, color: "var(--warm-gray)" }}>メニュー</span>
            {data.menuItems.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <span style={{ fontSize: 14 }}>{m.name}</span>
                <span className="mono" style={{ fontSize: 14 }}>
                  ¥{m.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 4,
              paddingBottom: 16,
              borderBottom: "1px solid var(--cream-dark)",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500 }}>合計</span>
            <span
              className="mono"
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: "var(--wood-dark)",
              }}
            >
              ¥{totalPrice.toLocaleString()}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--cream-dark)",
              paddingBottom: 12,
            }}
          >
            <span style={{ fontSize: 12, color: "var(--warm-gray)" }}>お名前</span>
            <span style={{ fontSize: 14 }}>{data.customer.name}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 12, color: "var(--warm-gray)" }}>電話番号</span>
            <span className="mono" style={{ fontSize: 14 }}>
              {data.customer.phone}
            </span>
          </div>
          {data.customer.note && (
            <div>
              <span style={{ fontSize: 12, color: "var(--warm-gray)" }}>備考</span>
              <p style={{ fontSize: 14, marginTop: 4, lineHeight: 1.7 }}>
                {data.customer.note}
              </p>
            </div>
          )}
        </div>

        <button
          className="btn-primary"
          onClick={onConfirm}
          style={{ width: "100%", marginTop: 36, borderRadius: 0 }}
        >
          予約を確定する
        </button>
      </div>
    </div>
  );
});
