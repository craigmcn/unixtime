# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server at http://localhost:3120
yarn build        # Type-check (tsc) then build to dist/
yarn build:netlify  # Build two output dirs: netlify/ and netlify/unixtime/ (for Netlify subdirectory)
yarn preview      # Preview the production build locally
yarn lint         # ESLint with auto-fix on src/
```

There are no tests.

## Architecture

This is a single-page React + TypeScript app built with Vite 8 + SWC. It converts a Unix timestamp or natural-language date string into multiple date-time formats, with optional timezone support.

**Data flow:**
1. `Form` collects a time string and optional timezone from the user.
2. `App` holds the `useConversion` hook, which calls `convertTime()` whenever the form submits and stores the result in state.
3. `Result` renders the `IConversion` data (timestamp, UTC, local timezone, ISO 8601, RFC 2822).

**Core logic — `src/lib/functions/convertTime.ts`:**
- If the input is numeric, it detects seconds/milliseconds/microseconds/nanoseconds by magnitude and creates a `dayjs.unix()` date.
- If the input is non-numeric, it runs `chrono-node` to parse natural-language dates. Timezone offsets are applied manually using `dayjs(utcMs).tz(timezone).utcOffset()` (minutes east of UTC — negated before applying, since the original Moment API returned minutes west).
- Timezone validation uses the native `Intl.supportedValuesOf('timeZone')` — no library needed.
- The string `"now"` (and variants like `"now()"`) is treated as the current time with no offset adjustment.
- Day.js plugin setup (utc, timezone, advancedFormat) lives in `src/lib/dayjs.ts` — always import from there, not directly from `dayjs`.

**URL state:** `useConversion` reads `?time=` and `?timezone=` query params on mount as initial values. `Result` exposes a "Repeat" link and a "Copy" button that encode the current conversion as a shareable URL via `getRequestUrl()`.

**Styling:** AlbertCSS v0.15.0, served via CDN (`https://albertcss.craigmcn.com/v0.15.0/css/albert.min.css`). Dark mode is automatic via CSS custom properties — no `dark:` prefixes. The `react-select` timezone dropdown uses `react-select-container` / `react-select` class prefixes for custom styling. Custom project styles live in `src/index.css`.

**CSS conventions:**
- Use modern CSS nesting with `&` and nested `@media` — no preprocessor (PostCSS/Sass/Tailwind removed).
- AlbertCSS spacing scale matches Tailwind (n × 0.25rem): `mb-4`, `mt-2`, `gap-1` etc. transfer directly.
- AlbertCSS class mappings: `sr-only` → `visually-hidden`; `font-bold` → `fw-bold`; `flex items-center` → `d-flex align-items-center`; `np__bg`/`np__txt` for SVG fills in dark mode.

**Timezone data:** `src/data/timezones.json` is a static list of `{value, label}` objects loaded lazily in `Form` via a dynamic `import()`.

**Two build configs:**
- `vite.config.ts` — standard build to `dist/`, relative base (`./`).
- `vite.config.netlify.ts` — outputs to both `netlify/` and `netlify/unixtime/` in one build, for deployment at root and under a subdirectory simultaneously.
- Both configs use `@vitejs/plugin-react` and a `manualChunks` function (Rolldown/Vite 8 requires a function, not an object) that puts React, FontAwesome, and Day.js into a `vendor` chunk.

**ESLint + Prettier conventions to follow:**
- Config: `eslint.config.mjs` (ESLint 9 flat config). No `.eslintrc`.
- Formatting is handled by Prettier (`.prettierrc`): single quotes, semi-colons, tab width (i.e., 2 spaces). Run `yarn format` to apply.
- ESLint handles code quality only — recommended rules from `@typescript-eslint`, `eslint-plugin-react`, and `eslint-plugin-react-hooks`, plus:
  - Interfaces must be prefixed with `I` (e.g. `IFormData`).
  - `react/jsx-no-bind` is enabled — don't pass inline arrow functions as JSX props; use `useCallback`.
  - `react/react-in-jsx-scope` is off — do not add `import React from 'react'` to new files.
  - `@typescript-eslint/no-explicit-any` is a warning — avoid `any`.
