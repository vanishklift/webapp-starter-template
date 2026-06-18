# Frontend

TanStack Start app for Workbench. For setup, scripts, and git workflow, start at the [root README](../README.md).

## Layout

```
frontend/src/
├── components/
│   ├── app/          # App-wide shells (PageShell, etc.)
│   └── ui/           # shadcn/ui primitives
├── features/
│   └── tasks/        # Task feature components and hooks
├── routes/           # Page assembly and loaders
└── lib/              # Shared utilities
```

## Commands

Run from `frontend/` or via root `npm --prefix frontend run <script>`:

| Command                | Description             |
| ---------------------- | ----------------------- |
| `npm run dev`          | Dev server on port 3000 |
| `npm run build`        | Production build        |
| `npm run lint`         | ESLint                  |
| `npm run typecheck`    | TypeScript check        |
| `npm run test`         | Vitest                  |
| `npm run check:format` | Prettier format check   |

## Convex connection

1. Run `npm run dev:backend` from the repo root.
2. Copy the deployment URL into `frontend/.env.local`:

```bash
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

3. Restart the frontend dev server.

The frontend imports Convex generated types via the `@convex/*` path alias (see `tsconfig.json`).

## Related docs

- [docs/starter-architecture.md](../docs/starter-architecture.md)
- `.cursor/skills/frontend-component-architecture/SKILL.md`
