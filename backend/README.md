# Backend (Convex)

Convex functions live in `convex/`. The root `convex.json` points here.

## Commands

Run from repo root:

```bash
npm run dev:backend    # convex dev — sync functions, start HTTP API
npm --prefix backend run deploy   # deploy to production Convex project
```

## First-time setup

1. `npm run dev:backend`
2. Log in with GitHub when prompted
3. Convex creates a project and writes `.convex/` config at repo root
4. Copy deployment URL to `frontend/.env.local` as `VITE_CONVEX_URL`

## HTTP API

When `convex dev` is running, the Hono HTTP layer exposes documented endpoints:

| URL | Purpose |
|-----|---------|
| `/api/openapi` | OpenAPI spec |
| `/api/scalar` | Interactive API docs (Scalar UI) |
| `/api/tasks` | Tasks CRUD endpoints |

See [docs/starter-architecture.md](../docs/starter-architecture.md) for the full API reference and architecture.

## Environment variables

Set in Convex dashboard → Environment Variables (optional):

| Variable | Required | Description |
|----------|----------|-------------|
| `POSTHOG_API_KEY` | No | PostHog API key for error logging |
| `POSTHOG_ENDPOINT` | No | PostHog endpoint override (default: US) |

See [backend/.env.example](.env.example) for reference.

## Project structure

```
convex/
├── schema.ts              # Database schema
├── http.ts                # Main HTTP router (Hono + OpenAPI + Scalar)
├── tasks.ts               # Compatibility re-export for frontend
└── src/
    ├── _shared/           # Error codes, HTTP response schemas
    ├── internal/logging/  # PostHog error logging action
    └── tasks/             # Feature: queries, mutations, http
```

## Sample data

```bash
npx convex import --table tasks sampleData.jsonl
```

## Docs

- [Starter architecture](../docs/starter-architecture.md)
- [Convex documentation](https://docs.convex.dev/home)
- [TanStack Start + Convex quickstart](https://docs.convex.dev/quickstart/tanstack-start)
