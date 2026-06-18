# Starter Repository Decisions

This document records the agreed defaults for the workbench starter repo.

## Stack

| Area | Choice |
|------|--------|
| Frontend | TanStack Start (React, SSR-capable) |
| Routing | TanStack Router |
| Backend | Convex (queries, mutations, schema) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Package manager | npm (pnpm optional later) |
| Node.js | v20+ (tested on v24) |

## Quality baseline

| Tool | Purpose |
|------|---------|
| ESLint | Linting (`@tanstack/eslint-config`) |
| Prettier | Formatting |
| Vitest | Unit tests |

## Branch workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `staging` | Integration and pre-release testing |
| `feat/*`, `fix/*`, `chore/*` | Short-lived feature branches |

## AI and agent tooling

| Tool | When to use |
|------|-------------|
| [Greptile](https://www.greptile.com/docs/introduction) | Automatic PR review on every pull request |
| [opensrc](https://github.com/vercel-labs/opensrc) | Give coding agents source context for npm packages |
| [code-structure skill](https://github.com/michaelshimeles/skills) | Guide service-layer architecture when refactoring |

Greptile runs during PR review (not before opening a PR). Local lint/test runs before pushing.

## Deployment (placeholder)

| Branch | Target (configure later) |
|--------|--------------------------|
| `staging` | Staging environment |
| `main` | Production environment |

## Repository layout

```
workbench/
├── frontend/          # TanStack Start app
├── backend/
│   └── convex/        # Convex functions and schema
├── docs/              # Team guides and checklists
├── .github/           # PR templates, issue templates, CI
└── convex.json        # Points Convex CLI to backend/convex
```
