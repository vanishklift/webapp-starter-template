# Backend (Convex)

Convex functions live in `convex/`. The root `convex.json` points here.

## Commands

Run from repo root:

```bash
npm run dev:backend    # convex dev — sync functions to cloud dev deployment
npm --prefix backend run deploy   # deploy to production Convex project
```

## First-time setup

1. `npm run dev:backend`
2. Log in with GitHub when prompted
3. Convex creates a project and writes `.convex/` config at repo root
4. Copy deployment URL to `frontend/.env.local` as `VITE_CONVEX_URL`

## Sample data

```bash
npx convex import --table tasks sampleData.jsonl
```

## Docs

- [Convex documentation](https://docs.convex.dev/home)
- [TanStack Start + Convex quickstart](https://docs.convex.dev/quickstart/tanstack-start)
