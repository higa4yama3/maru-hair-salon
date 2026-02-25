import { memo } from "react";
import { motion } from "framer-motion";
import { STYLISTS } from "../constants/stylists";
import { useInView } from "../hooks/useInView";

export const StylistSection = memo(function StylistSection() {
  const { ref, isInView } = useInView();
  const stylist = STYLISTS[0];

  if (!stylist) return null;

  return (
    <section
      ref={ref}
      id="stylist"
      className={`section-pad ${isInView ? "reveal visible" : "reveal"}`}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="stylist-heading"
    >
      <div
        className="mono"
        style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--gold)" }}
        aria-hidden="true"
      >
        STYLIST
      </div>
      <h2
        id="stylist-heading"
        className="serif"
        style={{
          fontSize: 36,
          fontWeight: 300,
          color: "var(--wood-dark)",
          marginTop: 8,
          letterSpacing: "0.08em",
        }}
      >
        Stylist
      </h2>
      <div className="section-accent-line" aria-hidden="true" />

      <motion.div
        style={{
          marginTop: 40,
          maxWidth: 480,
          width: "100%",
          padding: 28,
          border: "1px solid var(--cream-dark)",
          background: "var(--warm-white)",
        }}
        whileHover={{
          y: -4,
          boxShadow: "0 12px 40px rgba(61, 43, 31, 0.08)",
          transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        }}
        whileTap={{ scale: 0.99 }}
      >
        <div style={{ fontSize: 36, marginBottom: 16 }} aria-hidden="true">
          {stylist.avatar}
        </div>
        <div
          className="serif"
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "var(--wood-dark)",
          }}
        >
          {stylist.name}
        </div>
        <div
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "var(--wood-light)",
            marginTop: 4,
          }}
        >
          {stylist.role}
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--wood-mid)",
            marginTop: 16,
            lineHeight: 1.8,
          }}
        >
          {stylist.bio}
        </p>
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {stylist.specialties.map((sp) => (
            <span
              key={sp}
              style={{
                fontSize: 11,
                padding: "3px 10px",
                background: "var(--gold-pale)",
                color: "var(--wood-mid)",
                borderRadius: 12,
                opacity: 0.8,
              }}
            >
              {sp}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
});
