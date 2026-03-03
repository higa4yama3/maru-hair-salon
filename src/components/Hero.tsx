import { memo } from "react";

interface HeroProps {
  readonly onReserve: () => void;
}

const DECO_CIRCLES = [
  { top: "12%", left: "8%", width: 14, height: 14, background: "var(--gold-pale)", delay: "0s" },
  { top: "20%", right: "14%", width: 8, height: 8, border: "1.5px solid var(--sage-light)", delay: "1.5s" },
  { bottom: "28%", left: "15%", width: 6, height: 6, background: "var(--dried-rose)", opacity: 0.35, delay: "3s" },
  { bottom: "38%", right: "9%", width: 11, height: 11, border: "1px solid var(--gold-light)", delay: "2s" },
  { top: "50%", left: "5%", width: 4, height: 4, background: "var(--sage)", opacity: 0.25, delay: "4.5s" },
  { top: "65%", right: "6%", width: 18, height: 18, border: "1px solid var(--cream-dark)", delay: "0.5s" },
  { top: "35%", left: "22%", width: 5, height: 5, border: "1px solid var(--gold-pale)", delay: "3.5s" },
  { bottom: "18%", right: "20%", width: 7, height: 7, background: "var(--gold-pale)", opacity: 0.4, delay: "1s" },
] as const;

export const Hero = memo(function Hero({ onReserve }: HeroProps) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: `
          radial-gradient(ellipse at 25% 30%, rgba(196, 160, 85, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at 75% 70%, rgba(154, 139, 90, 0.04) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, rgba(248, 238, 209, 0.4) 0%, transparent 70%),
          linear-gradient(180deg, var(--warm-white) 0%, var(--cream) 100%)
        `,
        overflow: "hidden",
      }}
    >
      {/* Large background circle — maru motif */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "55vmin",
          height: "55vmin",
          borderRadius: "50%",
          border: "1px solid rgba(196, 160, 85, 0.08)",
          top: "50%",
          left: "50%",
          animation: "breathe 10s ease-in-out infinite",
        }}
      />

      {/* Second concentric ring */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "75vmin",
          height: "75vmin",
          borderRadius: "50%",
          border: "1px solid rgba(196, 160, 85, 0.04)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "gentleSpin 120s linear infinite",
        }}
      />

      {/* Decorative floating circles */}
      {DECO_CIRCLES.map((circle, i) => {
        const { delay, ...pos } = circle;
        return (
          <span
            key={i}
            className="deco-circle"
            style={{ ...pos, animationDelay: delay } as React.CSSProperties}
            aria-hidden="true"
          />
        );
      })}

      <div style={{ textAlign: "center", zIndex: 1 }}>
        {/* Logo circle */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: "0.2s" }}
          aria-hidden="true"
        >
          <div
            className="serif"
            style={{
              fontSize: 80,
              fontWeight: 300,
              color: "var(--gold)",
              letterSpacing: "0.1em",
              lineHeight: 1,
            }}
          >
            ○
          </div>
        </div>

        {/* Title */}
        <h1
          className="serif hero-title animate-fade-up"
          style={{
            fontSize: 76,
            fontWeight: 300,
            color: "var(--wood-dark)",
            letterSpacing: "0.25em",
            marginTop: 16,
            animationDelay: "0.4s",
          }}
        >
          maru
        </h1>

        {/* Decorative line under title */}
        <div
          className="animate-fade-up"
          style={{
            animationDelay: "0.5s",
            display: "flex",
            justifyContent: "center",
            marginTop: 14,
          }}
          aria-hidden="true"
        >
          <div
            style={{
              width: 48,
              height: 1,
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          className="animate-fade-up"
          style={{
            fontSize: 12,
            letterSpacing: "0.35em",
            color: "var(--wood-light)",
            marginTop: 16,
            fontWeight: 300,
            animationDelay: "0.6s",
          }}
        >
          HAIR & LIFE STYLE
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up"
          style={{
            marginTop: 52,
            animationDelay: "0.8s",
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn-primary"
            onClick={onReserve}
            style={{ borderRadius: 0 }}
          >
            予約する
          </button>
          <a
            href="tel:0120-000-000"
            className="btn-outline"
            style={{
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderColor: "var(--gold-light)",
              textDecoration: "none",
            }}
            aria-label="電話で予約する: 0120-000-000"
          >
            <span style={{ fontSize: 14 }} aria-hidden="true">
              ☎
            </span>{" "}
            電話予約
          </a>
        </div>

        {/* Hours info */}
        <p
          className="mono animate-fade-up"
          style={{
            fontSize: 11,
            color: "var(--warm-gray)",
            marginTop: 24,
            animationDelay: "1s",
          }}
        >
          OPEN 10:00–20:00 ・ CLOSED TUESDAY
        </p>
      </div>

      {/* Scroll indicator with pulsing line */}
      <div
        className="animate-fade-in"
        style={{
          position: "absolute",
          bottom: 40,
          animationDelay: "1.5s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
        aria-hidden="true"
      >
        <div
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "var(--warm-gray)",
            writingMode: "vertical-rl",
          }}
        >
          SCROLL
        </div>
        <div
          style={{
            width: 1,
            height: 28,
            background: "var(--gold-light)",
            animation: "scrollPulse 2.5s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
});
