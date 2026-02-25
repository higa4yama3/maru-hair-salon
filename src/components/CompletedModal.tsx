import { memo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface CompletedModalProps {
  readonly onClose: () => void;
}

export const CompletedModal = memo(function CompletedModal({
  onClose,
}: CompletedModalProps) {
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
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="completed-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ textAlign: "center" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Success circle with checkmark — echoes maru motif */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: "1.5px solid var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
            animation: "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
          aria-hidden="true"
        >
          <span
            className="serif"
            style={{
              fontSize: 28,
              color: "var(--gold)",
              marginTop: 2,
            }}
          >
            ✓
          </span>
        </div>

        <h3
          id="completed-title"
          className="serif"
          style={{
            fontSize: 28,
            fontWeight: 300,
            color: "var(--wood-dark)",
          }}
        >
          ご予約ありがとうございます
        </h3>

        {/* Decorative line */}
        <div
          style={{
            width: 32,
            height: 1,
            background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
            margin: "20px auto",
          }}
          aria-hidden="true"
        />

        <p
          style={{
            fontSize: 14,
            color: "var(--wood-light)",
            marginTop: 8,
            lineHeight: 1.9,
          }}
        >
          確認のSMSをお送りしました。
          <br />
          当日お会いできることを楽しみにしています。
        </p>
        <p
          className="mono"
          style={{ fontSize: 11, color: "var(--warm-gray)", marginTop: 24 }}
        >
          ※ デモサイトのため実際の送信は行われません
        </p>
        <motion.button
          className="btn-primary"
          onClick={onClose}
          style={{ marginTop: 32, borderRadius: 0 }}
          whileTap={{ scale: 0.97 }}
        >
          閉じる
        </motion.button>
      </motion.div>
    </motion.div>
  );
});
