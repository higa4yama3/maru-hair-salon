import { memo } from "react";
import { useInView } from "../hooks/useInView";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = memo(function Footer() {
  const { ref, isInView } = useInView({ threshold: 0.08 });

  return (
    <footer
      ref={ref}
      style={{
        background: "var(--wood-dark)",
        color: "var(--cream)",
        padding: "80px clamp(20px, 5vw, 40px) 40px",
        marginTop: 60,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background circle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "1px solid rgba(212, 184, 120, 0.06)",
          top: "-80px",
          right: "-60px",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(212, 184, 120, 0.04)",
          bottom: "20px",
          left: "-40px",
          pointerEvents: "none",
        }}
      />

      <div
        className={isInView ? "reveal visible" : "reveal"}
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 48,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              className="serif"
              style={{
                fontSize: 32,
                fontWeight: 300,
                color: "var(--gold-light)",
              }}
            >
              ○
            </span>
            <span
              className="serif"
              style={{
                fontSize: 28,
                fontWeight: 300,
                letterSpacing: "0.15em",
                color: "var(--gold-light)",
              }}
            >
              maru
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              opacity: 0.5,
              marginTop: 16,
              lineHeight: 1.9,
            }}
          >
            HAIR & LIFE STYLE
            <br />
            〒000-0000 東京都渋谷区○○ 1-2-3
            <br />
            木造ビル 2F
          </p>
        </div>
        <div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              opacity: 0.4,
              marginBottom: 14,
            }}
          >
            HOURS
          </div>
          <div
            style={{
              width: 20,
              height: 1,
              background: "var(--gold)",
              opacity: 0.3,
              marginBottom: 14,
            }}
            aria-hidden="true"
          />
          <p style={{ fontSize: 13, opacity: 0.6, lineHeight: 2.1 }}>
            月・水〜金　10:00–20:00
            <br />
            土・日・祝　10:00–19:00
            <br />
            火曜定休
          </p>
        </div>
        <div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              opacity: 0.4,
              marginBottom: 14,
            }}
          >
            CONTACT
          </div>
          <div
            style={{
              width: 20,
              height: 1,
              background: "var(--gold)",
              opacity: 0.3,
              marginBottom: 14,
            }}
            aria-hidden="true"
          />
          <a
            href="tel:0120-000-000"
            style={{
              color: "var(--cream)",
              textDecoration: "none",
              fontSize: 20,
              fontWeight: 300,
              letterSpacing: "0.05em",
              transition: "color 0.3s ease",
            }}
            aria-label="電話する: 0120-000-000"
          >
            0120-000-000
          </a>
          <p className="mono" style={{ fontSize: 11, opacity: 0.35, marginTop: 10 }}>
            @maru_hair
          </p>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1100,
          margin: "48px auto 0",
          borderTop: "1px solid rgba(245, 240, 232, 0.08)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          className="mono"
          style={{ fontSize: 10, opacity: 0.25, letterSpacing: "0.1em" }}
        >
          &copy; {CURRENT_YEAR} maru — DEMO SITE
        </p>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            border: "1px solid rgba(212, 184, 120, 0.2)",
          }}
          aria-hidden="true"
        />
      </div>
    </footer>
  );
});
