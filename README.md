# Maru Hair Salon

A multi-step appointment booking system for a Japanese hair salon, built as a single-page application with React 18 and TypeScript.

**Live Demo:** [higa4yama3.github.io/maru-hair-salon](https://higa4yama3.github.io/maru-hair-salon/)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Create React App) |
| Language | TypeScript (strict mode) |
| Animation | Framer Motion |
| Validation | Zod |
| Styling | CSS-in-JS with CSS Custom Properties |
| Testing | Jest + React Testing Library |
| CI/CD | GitHub Actions → GitHub Pages |

## Booking Flow

The app guides users through a 3-step booking process:

### Step 1 — Service Selection

Users browse 10 services across 5 categories (Cut, Color, Perm, Treatment, Other) and select up to 4 items. Price and estimated duration update in real time.

### Step 2 — Date & Time Selection

An interactive calendar displays availability up to 5 months ahead. Time slots are calculated based on:

- Business hours per day of week
- Existing bookings with 15-minute buffer
- Blocked time slots and special dates
- Total duration of selected services
- 30-minute slot intervals

### Step 3 — Customer Information

Name, phone number (validated against Japanese format via Zod schema), and optional notes. All fields are validated before proceeding.

A sticky confirmation bar at the bottom tracks progress across steps, shows the running total, and opens a confirmation modal for final review before submission.

## Architecture

**State management** is prop-driven — all booking state lives in `App.tsx` and flows down via props. No Context API or external state library.

**Immutability** is enforced at the type level with `readonly` modifiers on all interfaces.

**Performance** — components are wrapped with `React.memo()` and callbacks with `useCallback` to minimize unnecessary re-renders.

**Styling** is centralized in a single `GlobalStyle` component using 25+ CSS custom properties, keyframe animations, and responsive breakpoints at 768px and 480px.

### Project Structure

```
src/
├── components/       # 13 React components (Hero, Nav, MenuSection, CalendarSection, etc.)
├── constants/        # Static data (menu items, demo bookings, schedule config, stylists)
├── hooks/            # Custom hooks (useInView, useScrolled)
├── types/            # TypeScript type definitions (all readonly)
├── utils/            # Business logic (availability calculation, validation, step status)
├── App.tsx           # Root component and state orchestration
└── index.tsx         # Entry point
```

## Availability Algorithm

The slot calculation engine in `src/utils/availability.ts` determines bookable time slots:

1. Resolve business hours for the target date (special dates take priority over weekly schedule)
2. Compute total duration from selected services
3. Generate candidate slots at 30-minute intervals within business hours
4. Filter out slots that overlap with existing bookings (including 15-minute buffers)
5. Filter out slots that overlap with blocked time ranges
6. Return remaining available slots

## CI/CD

Every push to `main` triggers a GitHub Actions pipeline:

**Lint** (zero-warning policy) → **Type Check** (`tsc --noEmit`) → **Build** → **Deploy** to GitHub Pages

The pipeline fails on any lint warning or type error.

## Development

```bash
npm start        # Development server
npm test         # Run tests
npm run build    # Production build
npm run deploy   # Build and deploy to GitHub Pages
```

## License

MIT
