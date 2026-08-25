# Onboarding guide

Welcome! This document explains how the Unix Timestamp Converter is put together, in plain English. It's aimed at junior and intermediate developers who are new to this codebase (or coming back after a while away). For quick command references and repo-specific conventions, see the root [CLAUDE.md](../CLAUDE.md) — this doc is the "why" and "how it fits together" companion to that.

## What the app does

A single page with one text input: type a Unix timestamp (seconds, milliseconds, microseconds, or nanoseconds) or a natural-language date/time string like `"next friday 3pm"` or `"now"`, optionally pick a timezone, and hit Convert. The result panel shows that moment as a raw timestamp, in UTC, in the chosen timezone (if any), and as ISO 8601 and RFC 2822 strings. The whole thing is shareable — the result includes a "Repeat" link and a "Copy" button that encode the conversion as a `?time=&timezone=` URL.

Live at [craigmcn.com/unixtime](https://www.craigmcn.com/unixtime/).

## The tech stack, briefly

- **React 19 + TypeScript**, built with **Vite 8**. Client-side only — no backend, no server-side rendering, no external API calls.
- **Day.js** (with `utc`, `timezone`, and `advancedFormat` plugins) for all date math and formatting.
- **chrono-node** for parsing natural-language date strings.
- **react-select** for the timezone dropdown.
- **Font Awesome** (Sharp Duotone Light icon set) for icons.
- **AlbertCSS** (Craig's own CSS framework) loaded via a `<link>` tag in `index.html` — no CSS-in-JS, no Tailwind.
- **Vitest + React Testing Library** for unit/component tests, **Playwright** for end-to-end browser tests.
- Hosted on **Netlify** and **GitHub Pages** — purely static, no serverless functions (unlike some sibling apps such as `currency`, which proxies a rates API).

If you've worked in any typical React + TypeScript + Vite app before, this will feel familiar. There's no Redux, no React Query, no router — it's intentionally a one-page tool.

## Pages

There is exactly **one page**. No React Router, no routes. Everything lives under the single `<App>` component:

```
App
├── Header (site title + logo, links back to craigmcn.com)
└── Main ("Convert a date and time")
    ├── Form   (the input side)
    └── Result (the output side)
```

## Components — what does what

All components live in `src/components/`, split into `Converter/` (the app-specific pieces) and `Shared/` (generic pieces any page-like section could reuse). Here's the map:

| Component | File | Job |
|---|---|---|
| `App` | `src/App.tsx` | Top-level shell: renders `Header`, `Main`, `Form`, `Result`. Owns nothing itself — just wires the `useConversion` hook's `data` and `setConversion` to the two child components. |
| `Header` | `src/components/Header/Header.tsx` | Site header: logo, "craigmcn" home link, page `<h1>`. |
| `Logo` | `src/components/Header/Logo.tsx` | Inline SVG logo used in the header. |
| `Main` | `src/components/Shared/Main.tsx` | Layout wrapper (`<main>` + optional `<h2>` title + grid container for its children). |
| `Section` | `src/components/Shared/Section.tsx` | A `flex__item` grid cell — both `Form` and `Result` render inside one of these so they sit side by side on wider screens. |
| `Form` | `src/components/Converter/Form.tsx` | The input side — see "Data flow" below. |
| `Select` | `src/components/Converter/Select.tsx` | Wraps `react-select` for the timezone dropdown with AlbertCSS-matching styles. |
| `Result` | `src/components/Converter/Result.tsx` | The output side — see "Data flow" below. |
| `Button` | `src/components/Shared/Button.tsx` | Renders either a `<button>` or an `<a>` (if given an `href`) with the same `button` class — used for Convert, Repeat, and Copy. |
| `Alert` | `src/components/Shared/Alert.tsx` | Inline error/warning banner with an icon, shown above the results when `convertTime()` returns an `error` or `warning`. |

A good rule of thumb: **`useConversion` decides what the data is; `Form` and `Result` decide how it's entered and displayed.**

## Data flow — how state moves through the app

This is the part that trips people up first, so read it slowly.

1. **On mount**, `useConversion` (`src/lib/hooks/useConversion.ts`) initializes its `conversion` state by reading `?time=` and `?timezone=` from the URL — falling back to `"now"` / `"UTC"` if absent.
2. A `useEffect` watches `conversion` and calls `convertTime(time, timezone)` (`src/lib/functions/convertTime.ts`) whenever it changes, storing the result in a second `data` state.
3. `App` passes `setConversion` down to `Form`, and `data` down to `Result`. There's no context and no reducer — state only ever flows in one direction through these two props, because there's only one thing to coordinate (one form submission → one result).
4. `Form` reads the raw text input and the selected timezone from refs (not controlled state — see below) on submit, and calls `setConversion({ time, timezone })`.
5. That state change triggers `useConversion`'s effect, which re-runs `convertTime()` and updates `data`, which re-renders `Result`.

So the pattern is: **submit → `setConversion` → effect calls `convertTime()` → `data` updates → `Result` re-renders.** There's no debouncing or live-as-you-type conversion — nothing happens until the form is submitted.

### Why `Form` uses refs instead of controlled inputs

`Form` reads `timeRef.current?.value` and `timezoneRef.current?.props.value` directly in `handleSubmit`, rather than tracking the text input and timezone selection in `useState`. This keeps every keystroke from causing a re-render — a deliberate simplicity choice for a form with exactly one submit action and no live validation. If per-keystroke feedback (e.g. a live preview) is ever added, that would be the point to switch to controlled state.

### `convertTime()` — the actual conversion logic (`src/lib/functions/convertTime.ts`)

This is the heart of the app, and worth reading directly rather than just this summary:

- **Numeric input** is classified by magnitude and divided down to seconds: `1e10`–`1e13` is treated as milliseconds, `1e13`–`1e16` as microseconds, `1e16`–`1e19` as nanoseconds. Anything below `1e10` is assumed to already be seconds.
- **Non-numeric input** is handed to `chrono-node`, which returns a parsed date *as if* it were UTC (parsing is forced to `{ timezone: 0 }` unless the input is `"now"`/`"now()"`, which is passed through with no offset math). If a timezone was also supplied, the code manually re-applies the correct UTC offset for that zone at that moment — see the comment in the source about `utcOffset()` returning minutes *east* of UTC (the old Moment.js-based version this replaced returned minutes *west*, so the sign is flipped).
- If parsing fails entirely, the function falls back to the current time and sets `error` to a user-facing message. If a timezone is supplied but invalid (not in `Intl.supportedValuesOf('timeZone')`), it falls back to UTC and sets `warning` instead — `error` and `warning` are mutually exclusive in practice, and `Result` only ever shows one `Alert` at a time.
- Timezone validity is checked with the native `Intl.supportedValuesOf('timeZone')` — no timezone library or hardcoded list needed for validation (the dropdown's *options*, though, do come from a static JSON file — see below).

### `Result` — rendering the conversion

`Result` (`src/components/Converter/Result.tsx`) is purely presentational: it takes the `IConversion` object and renders it in five forms (timestamp, UTC, the chosen timezone if not UTC, ISO 8601, RFC 2822), using format strings from `src/lib/constants.ts`. It also has a side effect: a `useEffect` sets `document.title` to the converted date whenever `dateTime` or `timezone` changes, so the browser tab reflects whatever was last converted.

The "Repeat" and "Copy" actions both use `getRequestUrl()` (`src/lib/functions/index.ts`), which builds a `?time=&timezone=` URL from the current conversion — using the literal string `"now"` for the time param if the original input was `"now"` (so re-visiting the link gets the *current* time, not the frozen moment it was generated), otherwise the Unix timestamp.

### Timezone dropdown data

`src/data/timezones.json` is a static list of `{ value, label }` objects (all IANA timezone names), loaded lazily in `Form` via a dynamic `import()` on mount — this keeps the (fairly large) list out of the main bundle until the form actually needs it.

## Types

`src/lib/types.ts` is the single source of truth for shared TypeScript interfaces — `IFormData` (what `Form` submits), `IValue` (a `react-select` option), `IConversion` (the full result shape `convertTime()` returns and `Result` consumes). Interfaces in this codebase are prefixed with `I` (enforced by ESLint) — a project convention, not a TypeScript requirement.

## Tests

Two layers of tests, and they test different things:

### Unit / component tests (Vitest + React Testing Library)

Colocated next to the code they test (e.g. `convertTime.test.ts` sits beside `convertTime.ts`). Run with:

```bash
yarn test        # watch mode, good while developing
yarn test:run    # single pass, good for CI/checking before a commit
yarn coverage    # single pass + coverage report
```

What's covered:
- `convertTime()` — the numeric-magnitude classification, natural-language parsing, timezone offset math, and the error/warning fallback paths.
- `getRequestUrl()` — the `"now"` vs. fixed-timestamp URL-building logic.
- `useConversion` — reading `?time=`/`?timezone=` on mount, and that submitting updates `data`.
- `useCopyToClipboard` — success and failure paths, with `navigator.clipboard` mocked.
- `Header`, `Alert`, `Button`, `Form`, `Result` — rendering and interaction (e.g. that submitting `Form` calls `setConversion` with the right values).
- `App.test.tsx` also runs `vitest-axe` against the full rendered app to catch accessibility regressions. It's pinned to `vitest-axe@1.0.0-pre.5` — the published `0.1.0` ships a broken (empty) `extend-expect.js`. `eslint-plugin-jsx-a11y` (`recommended` rules) also runs over `src` via ESLint, so some accessibility issues are caught at lint time too.

### End-to-end tests (Playwright)

Live in `e2e/convert.spec.ts`, driven by `playwright.config.ts`. Run with:

```bash
yarn test:e2e
```

This spins up a real browser (Chromium, headless) against a real `yarn dev` server on port 3120 and drives the actual UI — entering a timestamp, reading the initial state from a `?time=` query param, and checking the error alert for unparseable input. `playwright.config.ts` pins the browser context to `timezoneId: "UTC"` so assertions on formatted dates are stable regardless of the machine running the tests. E2E tests only run in CI, not in the pre-commit hook — starting a browser is too slow for a hook.

### Before committing

A Husky pre-commit hook runs automatically:

```bash
yarn format:check && yarn lint && tsc -b && yarn test:run
```

If any of those fail, the commit is blocked. `yarn format` fixes Prettier issues; `yarn lint` auto-fixes what ESLint can.

## Deployment

Hosted on both **Netlify** and **GitHub Pages** simultaneously, from the same source:

- `vite.config.ts` — standard build to `dist/`, relative base (`./`).
- `vite.config.netlify.ts` — one build that outputs to *both* `netlify/` (served at the site root) and `netlify/unixtime/` (served under a `/unixtime/` subdirectory), since this app also lives as a section of craigmcn.com. Run via `yarn build:netlify`.
- Both configs use `@vitejs/plugin-react` and a `manualChunks` **function** (not an object — Rolldown/Vite 8 requires a function) that groups React, FontAwesome, and Day.js into a `vendor` chunk.
- CI (`.github/workflows/test.yml`) runs on every push to `main` and on all PRs: format check → lint → build → test → Playwright e2e.

## A few things that aren't obvious from reading the code

- **No backend at all.** Unlike `currency` (which proxies a rates API through a Netlify Function), this app does zero network calls beyond the initial page load and the lazy `timezones.json` import — everything is computed in the browser from Day.js and chrono-node.
- **`convertTime()`'s offset math only applies to non-numeric input.** A raw numeric timestamp is always treated as an absolute instant in time — the timezone param only affects how it's *displayed* (via `dateTime.tz(timezone)` in `Result`), not the underlying instant. For natural-language input, though, the timezone genuinely changes *which* instant is computed, because chrono-node has no way to know what timezone the user meant when they typed "3pm" — that's the reason for the manual `utcOffset()` correction in `convertTime()`.
- **`"now"` is special-cased twice** — once in `convertTime()` (skips the offset math entirely, since "now" has no ambiguity to resolve) and once in `getRequestUrl()` (keeps the URL's `time` param as the literal string `"now"` rather than freezing it to a timestamp, so a shared/repeated link always means "the current time," not "the time when the link was generated").
- **Interfaces vs. types:** shared, reusable shapes live in `src/lib/types.ts` and use the `I`-prefixed `interface` convention; there's no separate `types/` split by domain like some sibling repos (e.g. `colours`) — the app is small enough that one file covers it.

## Where to go next

- [README.md](../README.md) — user-facing usage instructions and a shorter command summary.
- [CLAUDE.md](../CLAUDE.md) — command reference, architecture notes, and ESLint/Prettier conventions.
- Open TODOs are tracked as GitHub issues in the project's [GitHub Project board](https://github.com/users/craigmcn/projects/11), not inline in this repo.
