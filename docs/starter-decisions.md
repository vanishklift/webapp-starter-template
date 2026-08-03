# Starter Repository Decisions

This document records the agreed defaults for the workbench starter repo.

## Stack

| Area | Choice |
|------|--------|
| Frontend | TanStack Start (React, SSR-capable) |
| Routing | TanStack Router |
| UI components | shadcn/ui (Radix + Tailwind CSS v4) |
| Backend | Convex (queries, mutations, schema) |
| HTTP API | Hono + OpenAPI + Scalar (via convex-helpers) |
| Error logging | PostHog (optional, background via scheduler) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Package manager | npm (pnpm optional later) |
| Node.js | v20.x (pinned via `engines` + `.nvmrc`) |

## Quality baseline

| Tool | Purpose |
|------|---------|
| ESLint | Linting (`@tanstack/eslint-config`) |
| Prettier | Formatting |
| TypeScript | `tsc --noEmit` in frontend and backend |
| Vitest | Unit tests (frontend components + backend shared utilities) |

## Branch workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `staging` | Integration and pre-release testing |
| `feat/*`, `fix/*`, `chore/*` | Short-lived feature branches |

## AI and agent tooling

| Tool | When to use |
|------|-------------|
| [Qodo](https://docs.qodo.ai/code-review/use-qodo-in-prs) | Manual `/agentic_review` on pull requests |
| `check-pr` skill | One-shot PR readiness check before human review |
| `qodo-loop` skill | Loop until Qodo Action required is clear and CI passes |
| `code-simplifier` skill | Clean up recently modified code before opening PR |
| [opensrc](https://github.com/vercel-labs/opensrc) | Fetch npm/repo source for deeper library context |
| [code-structure skill](https://github.com/michaelshimeles/skills) | Guide service-layer architecture when refactoring |

Qodo runs during PR review when you comment `/agentic_review` (not before opening a PR). Local lint/test runs before pushing.

## Deployment (placeholder)

| Branch | Target (configure later) |
|--------|--------------------------|
| `staging` | Staging environment |
| `main` | Production environment |

## Repository layout

```
workbench/
├── frontend/          # TanStack Start app + shadcn/ui
├── backend/
│   └── convex/        # Convex functions, Hono HTTP API
├── docs/              # Team guides, architecture, checklists
├── .cursor/skills/    # Agent skills
├── opensrc/           # Local source cache (gitignored)
└── convex.json        # Points Convex CLI to backend/convex
```

## Related docs

- [starter-architecture.md](starter-architecture.md) — full architecture explanation
- [opensrc-workflow.md](opensrc-workflow.md) — fetching dependency source
- [stack-source-repos.md](stack-source-repos.md) — upstream repo inventory
