# Ruzanova Fitness — Context for AI

## Project

- **Site:** Ruzanova Fitness (personal trainer / nutrition coach). Marketing site, conversion-focused.
- **Stack:** Next.js 14 (App Router), Tailwind CSS, TypeScript. Static export (`output: 'export'`).
- **Paths:** `app/` (layout, globals, page), `components/` (Hero, Header, Philosophy, ProblemSolution, etc.), `public/`, `public/images/` (hero and section backgrounds).

## Run

- `npm run dev` — dev server (port 3001)
- `npm run build` — static export to `out/`

## Design direction

Editorial luxury (Vogue x Margiela mood), restrained typography, dark hero, boutique CTAs. Mobile-first; desktop hero with full-bleed photo and text block on the right.

---

## Session summary (2025-02-25)

### Hero *(final — do not change)*

- **Mobile & tablet (< lg):** Vertical hero image (`/images/hero-bg.jpg` — 1_VERT). Background `bg-top`, no overlap of text on model; text block pushed right (`ml-[52%]`, `max-w-[48vw]` on small), then normal on md. Same VERT image used up to `lg` breakpoint.
- **Desktop (lg+):** Horizontal hero (`/images/hero-bg-desktop.jpg` — HERO_Hor). **No viewport-based scaling:** full-bleed layer with `background-size: cover`, `background-position: 70% 50%`. Content in `max-w-6xl`, text block right-aligned (`justify-end`), `lg:max-w-xl`, `lg:pl-8`. Previously tried 58vw/42vw split with `auto 100%` scaling — reverted as it behaved poorly; current approach is cover + fixed position only.
- **Removed:** Semi-transparent oval (BoundedShape/Editorial note card) over hero.
- **Headline:** Three lines: "Sculpt strength." / "Move beautifully." / "Feel unstoppable." — each in a `span` with `whitespace-nowrap` to avoid mid-phrase wrap.
- **Top strip:** No grey strip or gap between nav and hero on wide screens.
- **Overlay:** Gradient over hero: `from-ink/60 via-ink/40 to-ink/70`.

### About (Philosophy)

- Old medal/portrait photo removed. Section: text + one card + three pillars. Background: `section2-bg.jpg` (2_VERT).

### Header

- Logo link: no `onClick` on the link itself (fixed prop usage).
- Book button: rounded (not square).
- Transparent over hero, solid background after scroll. Mobile menu button styled for dark hero.

### Other

- **ProblemSolution:** Section background `section3-bg.jpg` (3_VERT).
- **globals.css:** html/body margin/padding reset; body first-child margin-top 0.
- **Layout:** Sticky CTA + bottom spacer for mobile.

### Assets (hero & sections)

- `public/images/hero-bg.jpg` — 1_VERT (mobile/tablet hero).
- `public/images/hero-bg-desktop.jpg` — HERO_Hor (desktop hero).
- `public/images/section2-bg.jpg`, `section3-bg.jpg` — section backgrounds.

---

## Decisions to keep

1. **Hero is final.** Do not change `components/Hero.tsx` — layout, images, copy, and styling are approved. Keep as-is.
2. **Desktop hero:** Do not reintroduce viewport-based scaling (58vw column, `background-size: auto 100%`). Use `cover` + `background-position` (e.g. `70% 50%`) only.
3. **Hero proportions:** Text lives in a contained width (`max-w-6xl`), right-aligned; no dynamic 58vw/42vw split.
4. **Mobile/tablet:** One vertical hero image up to `lg`; text and buttons must not overlap the model.

---

*Last updated: 2026-03-04*
