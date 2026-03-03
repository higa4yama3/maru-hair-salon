import { memo, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { MenuItem, CategoryFilter } from "../types";
import { MENU, CATEGORIES, CATEGORY_LABELS } from "../constants/menu";
import { useInView } from "../hooks/useInView";

const STAGGER_DELAY = 0.05;

const MAX_MENU_ITEMS = 4;

interface MenuSectionProps {
  readonly selectedItems: readonly MenuItem[];
  readonly onToggle: (item: MenuItem) => void;
}

export const MenuSection = memo(function MenuSection({
  selectedItems,
  onToggle,
}: MenuSectionProps) {
  const { ref, isInView } = useInView();
  const [cat, setCat] = useState<CategoryFilter>("ALL");

  const filtered = useMemo(
    () => (cat === "ALL" ? MENU : MENU.filter((m) => m.category === cat)),
    [cat]
  );

  const totalPrice = useMemo(
    () => selectedItems.reduce((sum, s) => sum + s.price, 0),
    [selectedItems]
  );

  const isItemSelected = useCallback(
    (id: number) => selectedItems.some((s) => s.id === id),
    [selectedItems]
  );

  const isAtLimit = selectedItems.length >= MAX_MENU_ITEMS;

  return (
    <section
      ref={ref}
      id="menu"
      className={`section-pad section-alt-bg ${isInView ? "reveal visible" : "reveal"}`}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="menu-heading"
    >
      <div className="section-bg-number" aria-hidden="true">01</div>

      <div
        className="mono"
        style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--gold)" }}
        aria-hidden="true"
      >
        01
      </div>
      <h2
        id="menu-heading"
        className="serif"
        style={{
          fontSize: 36,
          fontWeight: 300,
          color: "var(--wood-dark)",
          marginTop: 8,
          letterSpacing: "0.08em",
        }}
      >
        Menu
      </h2>
      <div className="section-accent-line" aria-hidden="true" />
      <p style={{ fontSize: 14, color: "var(--wood-light)", marginTop: 16 }}>
        メニューをお選びください
      </p>

      <div
        style={{ display: "flex", gap: 4, marginTop: 32, flexWrap: "wrap" }}
        role="tablist"
        aria-label="メニューカテゴリ"
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`cat-tab ${cat === c ? "active" : ""}`}
            onClick={() => setCat(c)}
            role="tab"
            aria-selected={cat === c}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24 }} role="listbox" aria-label="メニュー一覧" aria-multiselectable="true">
        {filtered.map((item, index) => {
          const isSelected = isItemSelected(item.id);
          const isDisabled = isAtLimit && !isSelected;
          return (
            <motion.div
              key={item.id}
              className={`menu-item ${isSelected ? "selected" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * STAGGER_DELAY,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileTap={isDisabled ? undefined : { scale: 0.98 }}
              onClick={() => !isDisabled && onToggle(item)}
              onKeyDown={(e) => {
                if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onToggle(item);
                }
              }}
              role="option"
              tabIndex={isDisabled ? -1 : 0}
              aria-selected={isSelected}
              aria-disabled={isDisabled}
              style={{
                opacity: isDisabled ? 0.4 : 1,
                cursor: isDisabled ? "default" : "pointer",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 15, fontWeight: 400 }}>{item.name}</span>
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: "var(--warm-gray)" }}
                  >
                    {item.duration}min
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "var(--warm-gray)", marginTop: 4 }}>
                  {item.description}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 14,
                    color: "var(--wood-dark)",
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  ¥{item.price.toLocaleString()}
                </span>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: isSelected ? "none" : "1px solid var(--cream-dark)",
                    background: isSelected ? "var(--wood-dark)" : "transparent",
                    color: "white",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                    transform: isSelected ? "scale(1)" : "scale(0.9)",
                  }}
                  aria-hidden="true"
                >
                  {isSelected ? "✓" : ""}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedItems.length > 0 && (
        <div
          style={{
            marginTop: 32,
            padding: "20px 16px",
            background: "linear-gradient(135deg, var(--cream) 0%, rgba(248, 238, 209, 0.6) 100%)",
            border: "1px solid var(--cream-dark)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
          aria-live="polite"
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: 13, color: "var(--wood-light)" }}>
              選択中（{selectedItems.length}/{MAX_MENU_ITEMS}）：
            </span>
            <span style={{ fontSize: 13, wordBreak: "break-word" }}>
              {selectedItems.map((s) => s.name).join("、")}
            </span>
          </div>
          <div
            className="mono"
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "var(--wood-dark)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            ¥{totalPrice.toLocaleString()}
          </div>
        </div>
      )}
    </section>
  );
});
