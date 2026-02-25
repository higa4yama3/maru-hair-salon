# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Style

- Direct, straight, simple — no preamble, greetings, or filler phrases
- No step-by-step progress announcements ("First I'll do X...")
- No emojis (except when creating content that requires them)
- Lead with the conclusion
- Point out issues frankly when they exist

## Commands

```bash
npm start          # Start development server
npm run build      # Production build
npm test           # Run tests (Jest + React Testing Library)
npm run deploy     # Build and deploy to GitHub Pages
```

Type-check without emitting: `npx tsc --noEmit`
Lint with zero-warning policy: `react-scripts lint` (also enforced in CI)

## Architecture

**React 18 SPA** — a multi-step appointment booking app for a Japanese hair salon. Built with Create React App, TypeScript strict mode, and Zod for validation.

### State Management

All booking state lives in `App.tsx` and is passed down via props. No Context API or Redux. The flow has 3 steps (tracked via `stepStatus.ts`):
1. Menu selection (services)
2. Date/time selection
3. Customer info → confirmation modal → completion modal

`BookingData` is assembled as a `useMemo` in `App.tsx` from individual state slices, then passed to `ConfirmModal`.

### Key Conventions

- All types in `src/types/index.ts` use `readonly` modifiers for immutability
- Components are wrapped with `React.memo()` and callbacks with `useCallback` throughout
- Styling is entirely centralized in `src/components/GlobalStyle.tsx` (~715 lines) — a single CSS-in-JS component with 25 CSS custom properties, keyframe animations, and responsive breakpoints at 768px/480px
- UI text is in Japanese throughout

### Data

- **Menu items** (`src/constants/menu.ts`): 10 services across 5 categories (CUT, COLOR, PERM, TREATMENT, OTHER)
- **Availability** (`src/utils/availability.ts`): Duration-based slot calculation — `getAvailableSlots` / `hasAnySlot` use bookings, blocked slots, business hours. Demo data in `src/constants/demoBookings.ts`
- **Phone validation** (`src/utils/validation.ts`): Japanese format `/^0\d{1,4}-?\d{1,4}-?\d{3,4}$/` via Zod schema

### CI/CD

GitHub Actions (`.github/workflows/deploy.yml`) runs lint → type-check → build → deploy to GitHub Pages on every push to `main`. Pipeline fails on any lint warning.
