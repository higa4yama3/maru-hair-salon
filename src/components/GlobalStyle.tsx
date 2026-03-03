import { memo } from "react";

export const GlobalStyle = memo(function GlobalStyle() {
  return (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&family=DM+Mono:wght@300;400&display=swap');

    :root {
      --wood-dark: #4A3728;
      --wood-mid: #7A6248;
      --wood-light: #A89070;
      --cream: #F8EED1;
      --cream-dark: #E8DDB8;
      --sage: #9A8B5A;
      --sage-light: #B8A870;
      --sage-dark: #7A6E42;
      --dried-rose: #C49878;
      --dried-lavender: #A89880;
      --charcoal: #33291E;
      --warm-white: #FDFAF0;
      --warm-gray: #B8A88E;
      --gold: #C4A055;
      --gold-light: #D4B878;
      --gold-pale: #E8D8A8;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html {
      scroll-behavior: smooth;
      overflow-x: hidden;
      width: 100%;
      max-width: 100%;
    }

    body {
      font-family: 'Zen Kaku Gothic New', sans-serif;
      background: var(--warm-white);
      color: var(--charcoal);
      font-weight: 300;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: geometricPrecision;
      -webkit-text-size-adjust: 100%;
      font-feature-settings: "palt" 1;
      overflow-x: hidden;
      width: 100%;
      max-width: 100%;
    }

    #root {
      overflow-x: hidden;
      width: 100%;
    }

    main {
      overflow-x: hidden;
      width: 100%;
    }

    ::selection {
      background: var(--gold-pale);
      color: var(--wood-dark);
    }

    /* Grain overlay */
    body::before {
      content: '';
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
    }

    .serif { font-family: 'Cormorant Garamond', serif; }
    .mono { font-family: 'DM Mono', monospace; }

    /* ─── Animations ─── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-12px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-6px) rotate(1deg); }
    }
    @keyframes growLine {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    @keyframes breathe {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.06; }
      50% { transform: translate(-50%, -50%) scale(1.03); opacity: 0.1; }
    }
    @keyframes scrollPulse {
      0% { transform: scaleY(0); opacity: 0; transform-origin: top; }
      40% { transform: scaleY(1); opacity: 0.6; transform-origin: top; }
      60% { transform: scaleY(1); opacity: 0.6; transform-origin: bottom; }
      100% { transform: scaleY(0); opacity: 0; transform-origin: bottom; }
    }
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    @keyframes revealLine {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    @keyframes gentleSpin {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* ─── Reduced Motion ─── */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    .animate-fade-up {
      animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      opacity: 0;
    }
    .animate-fade-in {
      animation: fadeIn 0.6s ease forwards;
      opacity: 0;
    }

    /* ─── Scroll Reveal ─── */
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-stagger-1 { transition-delay: 0.08s; }
    .reveal-stagger-2 { transition-delay: 0.16s; }
    .reveal-stagger-3 { transition-delay: 0.24s; }
    .reveal-stagger-4 { transition-delay: 0.32s; }
    .reveal-stagger-5 { transition-delay: 0.40s; }

    /* ─── Decorative Elements ─── */
    .deco-circle {
      position: absolute;
      border-radius: 50%;
      animation: float 8s ease-in-out infinite;
      pointer-events: none;
    }

    .section-accent-line {
      width: 40px;
      height: 1px;
      background: var(--gold);
      margin-top: 16px;
      transform-origin: left;
    }
    .reveal.visible .section-accent-line {
      animation: revealLine 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
      transform: scaleX(0);
    }

    .section-bg-number {
      position: absolute;
      top: 20px;
      right: 40px;
      font-family: 'Cormorant Garamond', serif;
      font-size: 140px;
      font-weight: 300;
      line-height: 1;
      color: var(--wood-dark);
      opacity: 0;
      pointer-events: none;
      user-select: none;
      transition: opacity 1.2s ease 0.2s;
    }
    .reveal.visible .section-bg-number {
      opacity: 0.03;
    }

    /* ─── Section Divider ─── */
    .section-divider {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 40px;
      position: relative;
    }
    .section-divider::after {
      content: '';
      display: block;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--gold-pale) 25%,
        var(--gold-light) 50%,
        var(--gold-pale) 75%,
        transparent 100%
      );
    }
    .divider-dot {
      position: absolute;
      left: 50%;
      bottom: -4px;
      transform: translateX(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1px solid var(--gold-light);
      background: var(--warm-white);
      z-index: 1;
    }

    /* ─── Scrollbar ─── */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, var(--gold-light), var(--wood-light));
      border-radius: 3px;
    }

    /* ─── Section base ─── */
    section { position: relative; }

    .section-pad {
      padding: 100px 40px;
      max-width: 1100px;
      margin: 0 auto;
    }

    /* ─── Nav ─── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(253, 251, 247, 0.85);
      border-bottom: 1px solid rgba(61, 43, 31, 0.08);
      transition: background 0.4s ease, box-shadow 0.4s ease;
    }
    nav.scrolled {
      background: rgba(253, 251, 247, 0.95);
      box-shadow: 0 2px 20px rgba(61, 43, 31, 0.06);
    }

    .nav-link {
      position: relative;
      background: none;
      border: none;
      cursor: pointer;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      transition: color 0.3s ease;
      padding: 4px 0;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--gold);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .nav-link:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
    .nav-link:hover {
      color: var(--wood-dark) !important;
    }
    .nav-link:active { transform: scale(0.98); }

    /* ─── Calendar ─── */
    .cal-day {
      transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
      cursor: pointer;
      border-radius: 50%;
      aspect-ratio: 1;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
      position: relative;
    }
    .cal-day:hover:not(.disabled):not(.closed) {
      background: var(--cream-dark);
      transform: scale(1.08);
    }
    .cal-day.selected {
      background: var(--wood-dark);
      color: white;
      box-shadow: 0 2px 12px rgba(74, 55, 40, 0.2);
    }
    .cal-day.disabled { opacity: 0.25; cursor: default; }
    .cal-day.closed { opacity: 0.2; cursor: default; text-decoration: line-through; }
    .cal-day.today::after {
      content: '';
      position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
      width: 4px; height: 4px; border-radius: 50%;
      background: var(--dried-rose);
    }
    .cal-day.has-slots::after {
      content: '';
      position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
      width: 4px; height: 4px; border-radius: 50%;
      background: var(--gold);
    }

    /* ─── Time slot ─── */
    .time-slot {
      padding: 8px 16px;
      border: 1px solid var(--cream-dark);
      border-radius: 20px;
      font-size: 13px;
      cursor: pointer;
      transition: border-color 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  background 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  color 0.25s cubic-bezier(0.22, 1, 0.36, 1);
      background: transparent;
      color: var(--charcoal);
      font-family: 'Zen Kaku Gothic New', sans-serif;
    }
    .time-slot:hover {
      border-color: var(--gold-light);
      background: var(--cream);
      transform: translateY(-1px);
    }
    .time-slot.selected {
      border-color: var(--wood-dark);
      background: var(--wood-dark);
      color: white;
      box-shadow: 0 2px 12px rgba(74, 55, 40, 0.15);
    }

    /* ─── Buttons ─── */
    .btn-primary {
      background: var(--wood-dark);
      color: white;
      border: none;
      padding: 14px 40px;
      font-family: 'Zen Kaku Gothic New', sans-serif;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.1em;
      cursor: pointer;
      transition: background 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                  box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                  opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      position: relative;
      overflow: hidden;
    }
    .btn-primary::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.08),
        transparent
      );
      transition: none;
    }
    .btn-primary:hover {
      background: var(--wood-mid);
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(74, 55, 40, 0.15);
    }
    .btn-primary:hover::after {
      animation: shimmer 0.6s ease forwards;
    }
    .btn-primary:active { transform: translateY(0) scale(0.97); box-shadow: none; }
    .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
    .btn-primary:disabled:hover::after { animation: none; }
    .btn-primary:focus-visible {
      outline: 2px solid var(--gold);
      outline-offset: 2px;
    }

    .btn-outline {
      background: transparent;
      color: var(--wood-dark);
      border: 1px solid var(--wood-light);
      padding: 10px 24px;
      font-family: 'Zen Kaku Gothic New', sans-serif;
      font-size: 13px;
      cursor: pointer;
      transition: border-color 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  background 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .btn-outline:hover {
      border-color: var(--wood-dark);
      background: var(--cream);
      transform: translateY(-1px);
    }
    .btn-outline:active { transform: translateY(0) scale(0.97); }
    .btn-outline:focus-visible {
      outline: 2px solid var(--gold);
      outline-offset: 2px;
    }

    /* ─── Input ─── */
    .input-field {
      width: 100%;
      padding: 12px 0;
      border: none;
      border-bottom: 1px solid var(--cream-dark);
      background: transparent;
      font-family: 'Zen Kaku Gothic New', sans-serif;
      font-size: 15px;
      font-weight: 300;
      color: var(--charcoal);
      transition: border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      outline: none;
    }
    .input-field:focus {
      border-bottom-color: var(--gold);
      border-bottom-width: 2px;
      padding-bottom: 11px;
    }
    .input-field::placeholder { color: var(--warm-gray); }
    .input-field.has-error { border-bottom-color: var(--dried-rose); }

    .input-label {
      font-size: 11px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--wood-light);
      margin-bottom: 4px;
      display: block;
      transition: color 0.3s ease;
    }

    .input-error {
      font-size: 12px;
      color: var(--dried-rose);
      margin-top: 6px;
      min-height: 18px;
    }

    /* ─── Stylist card ─── */
    .stylist-card {
      padding: 28px;
      border: 1px solid var(--cream-dark);
      cursor: pointer;
      transition: border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                  box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                  background 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      position: relative;
      background: var(--warm-white);
    }
    .stylist-card:hover {
      border-color: var(--gold-light);
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(61, 43, 31, 0.08);
    }
    .stylist-card.selected {
      border-color: var(--wood-dark);
      background: linear-gradient(135deg, var(--cream) 0%, var(--warm-white) 100%);
    }
    .stylist-card.selected::before {
      content: '✓';
      position: absolute; top: 12px; right: 16px;
      width: 24px; height: 24px; border-radius: 50%;
      background: var(--wood-dark); color: white;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px;
      animation: fadeIn 0.3s ease;
    }

    /* ─── Menu item ─── */
    .menu-item {
      padding: 20px 0;
      border-bottom: 1px solid var(--cream-dark);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: padding 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  background 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  margin 0.25s cubic-bezier(0.22, 1, 0.36, 1),
                  border-radius 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .menu-item:hover {
      padding-left: 12px;
      background: linear-gradient(90deg, rgba(248, 238, 209, 0.5) 0%, transparent 100%);
    }
    .menu-item.selected {
      background: linear-gradient(90deg, var(--cream) 0%, rgba(248, 238, 209, 0.3) 100%);
      padding-left: 16px;
      padding-right: 16px;
      margin: 0 -16px;
      border-radius: 4px;
    }

    /* ─── Category tab ─── */
    .cat-tab {
      padding: 8px 16px;
      font-size: 12px;
      letter-spacing: 0.12em;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--warm-gray);
      transition: color 0.25s cubic-bezier(0.22, 1, 0.36, 1);
      font-family: 'DM Mono', monospace;
      text-transform: uppercase;
      position: relative;
    }
    .cat-tab:hover { color: var(--wood-mid); }
    .cat-tab:active { transform: scale(0.97); }
    .cat-tab.active { color: var(--wood-dark); }
    .cat-tab.active::after {
      content: '';
      position: absolute; bottom: 0; left: 16px; right: 16px;
      height: 1.5px;
      background: var(--gold);
      animation: growLine 0.3s ease forwards;
    }

    /* ─── Phone banner ─── */
    .phone-banner {
      background: linear-gradient(135deg, var(--cream) 0%, rgba(248, 238, 209, 0.7) 100%);
      border: 1px solid var(--cream-dark);
      border-radius: 6px;
      padding: 22px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      transition: background 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                  box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      position: relative;
      overflow: hidden;
      width: 100%;
      min-width: 0;
    }
    .phone-banner::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 12px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 1px solid var(--gold-pale);
      opacity: 0.3;
      transform: translateY(-50%);
      pointer-events: none;
    }
    .phone-banner:hover {
      background: var(--cream);
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(61, 43, 31, 0.06);
    }
    .phone-banner:hover .phone-banner-arrow {
      transform: translateX(2px);
      background: var(--gold-light);
    }

    /* ─── Step indicator ─── */
    .step-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--cream-dark);
      transition: background 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  border-radius 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .step-dot.active {
      background: var(--wood-dark);
      width: 24px;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(74, 55, 40, 0.2);
    }
    .step-dot.done { background: var(--gold); }

    /* ─── Modal ─── */
    .modal-overlay {
      position: fixed; inset: 0; z-index: 200;
      background: rgba(44, 44, 44, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn 0.3s ease forwards;
    }
    .modal-content {
      background: var(--warm-white);
      max-width: 480px; width: 90%;
      max-height: 85vh; overflow-y: auto;
      padding: 48px 40px;
      position: relative;
      animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      box-shadow: 0 24px 80px rgba(44, 44, 44, 0.12);
    }

    /* ─── Leaf decoration (legacy) ─── */
    .leaf {
      position: absolute;
      font-size: 20px;
      opacity: 0.15;
      animation: float 6s ease-in-out infinite;
    }

    /* ─── Calendar layout ─── */
    .calendar-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      margin-top: 40px;
    }

    /* ─── Alternate section background ─── */
    .section-alt-bg {
      background: linear-gradient(180deg, rgba(248, 238, 209, 0.3) 0%, rgba(248, 238, 209, 0.1) 100%);
    }

    /* ─── Confirm bar ─── */
    .confirm-bar {
      position: sticky;
      bottom: 0;
      background: rgba(253, 251, 247, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid var(--cream-dark);
      padding: 16px clamp(16px, 5vw, 40px);
      z-index: 50;
      transition: box-shadow 0.3s ease;
      box-shadow: 0 -4px 20px rgba(61, 43, 31, 0.04);
    }

    /* ─── Mobile responsive ─── */
    @media (max-width: 768px) {
      .hero-title { font-size: 48px !important; }
      .section-pad { padding: 60px 20px; }
      .grid-3 { grid-template-columns: 1fr !important; }
      .modal-content { padding: 32px 20px; width: 95%; }
      .nav-inner { padding: 0 16px !important; }
      .calendar-layout {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .phone-banner {
        flex-direction: column;
        gap: 14px;
        text-align: center;
        padding: 20px 16px;
      }
      .phone-banner-right {
        justify-content: center;
      }
      .section-bg-number {
        font-size: 80px;
        right: 16px;
      }
      .confirm-bar { padding: 12px 16px; }
      .section-divider { padding: 0 20px; }
      .stylist-card { padding: 20px; }

      .menu-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .menu-item.selected {
        margin: 0;
        padding-left: 12px;
        padding-right: 12px;
      }
    }

    @media (max-width: 480px) {
      .hero-title { font-size: 36px !important; }
      .section-pad { padding: 48px 16px; }
      .section-bg-number { display: none; }
      .nav-inner { padding: 0 12px !important; }
      .phone-banner { padding: 16px 14px; }
      .confirm-bar { padding: 10px 12px; }
      .section-divider { padding: 0 16px; }

      .cat-tab {
        padding: 6px 10px;
        font-size: 10px;
      }
    }
  `}</style>
  );
});
