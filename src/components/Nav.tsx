import { memo, useCallback } from "react";

interface NavProps {
  readonly scrolled: boolean;
  readonly onNavigate: (target: string) => void;
  readonly currentView: string;
}

const NAV_ITEMS = ["STYLIST", "MENU", "RESERVE"] as const;

export const Nav = memo(function Nav({
  scrolled,
  onNavigate,
  currentView,
}: NavProps) {
  const handleHomeClick = useCallback(
    () => onNavigate("home"),
    [onNavigate]
  );

  return (
    <nav
      className={scrolled ? "scrolled" : ""}
      role="navigation"
      aria-label="メインナビゲーション"
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(16px, 5vw, 40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <button
          onClick={handleHomeClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            transition: "opacity 0.3s ease",
          }}
          aria-label="ホームに戻る"
        >
          <span
            className="serif"
            style={{
              fontSize: 28,
              fontWeight: 300,
              color: "var(--gold)",
              letterSpacing: "0.05em",
              transition: "transform 0.3s ease",
            }}
          >
            ○
          </span>
          <span
            className="serif"
            style={{
              fontSize: 22,
              fontWeight: 300,
              color: "var(--wood-dark)",
              letterSpacing: "0.15em",
            }}
          >
            maru
          </span>
        </button>

        <div style={{ display: "flex", gap: "clamp(16px, 4vw, 32px)", alignItems: "center" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => onNavigate(item.toLowerCase())}
                className="nav-link"
                style={{
                  color: isActive
                    ? "var(--wood-dark)"
                    : "var(--warm-gray)",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
});
