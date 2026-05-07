# Unix Timestamp Converter

[craigmcn.com/unixtime](https://www.craigmcn.com/unixtime/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/cf023f65-b3c6-42d3-95d4-0cde937a5d38/deploy-status)](https://app.netlify.com/sites/keen-haibt-ecf9f4/deploys)
[![Test](https://github.com/craigmcn/unixtime/actions/workflows/test.yml/badge.svg)](https://github.com/craigmcn/unixtime/actions/workflows/test.yml)

Converts a Unix timestamp or natural-language date string into UTC, local timezone, ISO 8601, and RFC 2822 formats, with optional timezone support. Results are shareable via query string (`?time=&timezone=`).

## Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) built with [Vite](https://vitejs.dev/)
- [Day.js](https://day.js.org/) for date parsing and formatting
- [chrono-node](https://github.com/wanasit/chrono) for natural-language date parsing
- [AlbertCSS](https://albertcss.craigmcn.com/) for styling

## Development

```bash
yarn install
yarn dev        # dev server at http://localhost:3120
yarn build      # type-check + build to dist/
yarn lint           # ESLint with auto-fix
yarn format         # Prettier write
yarn format:check   # Prettier check (used in pre-commit hook and CI)
yarn test           # Vitest watch mode
yarn test:run       # Vitest single pass
yarn coverage       # Vitest single pass with coverage report
```

## Testing

Vitest + Testing Library. 57 tests across unit, hook, and component tests.

```bash
yarn test       # watch mode
yarn test:run   # single pass
yarn coverage   # single pass with coverage report
```

## Deployment

Deployed on Netlify. Two build configs are available:

- `vite.config.ts` — standard build to `dist/`
- `vite.config.netlify.ts` — builds to both `netlify/` and `netlify/unixtime/` for deployment at root and under a subdirectory simultaneously
