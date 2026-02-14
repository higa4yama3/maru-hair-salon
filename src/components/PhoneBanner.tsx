import { memo } from "react";
import { useInView } from "../hooks/useInView";

export const PhoneBanner = memo(function PhoneBanner() {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={isInView ? "reveal visible" : "reveal"}
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 clamp(16px, 4vw, 40px)",
        overflow: "hidden",
      }}
    >
      <a
        href="tel:0120-000-000"
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
        aria-label="お電話でのご予約: 0120-000-000"
      >
        <div className="phone-banner">
          <div style={{ minWidth: 0, flexShrink: 1 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "var(--wood-mid)",
                letterSpacing: "0.06em",
              }}
            >
              お電話でのご予約
            </div>
            <div
              className="mono"
              style={{
                fontSize: 12,
                color: "var(--warm-gray)",
                marginTop: 5,
                letterSpacing: "0.02em",
              }}
            >
              受付 10:00–19:00（火曜除く）
            </div>
          </div>
          <div
            className="phone-banner-right"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 1,
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            <span
              className="serif"
              style={{
                fontSize: "clamp(20px, 5vw, 26px)",
                fontWeight: 300,
                color: "var(--wood-dark)",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              0120-000-000
            </span>
            <span
              className="phone-banner-arrow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--gold)",
                color: "var(--warm-white)",
                fontSize: 13,
                fontWeight: 500,
                flexShrink: 0,
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </a>
    </div>
  );
});
