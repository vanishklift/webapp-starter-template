# Workbench — Claude Code instructions

Read these before substantial work:

1. [AGENTS.md](../AGENTS.md) — branch workflow, agent skills, opensrc, project brief
2. [README.md](../README.md) — quick start, scripts, team onboarding
3. [docs/starter-architecture.md](../docs/starter-architecture.md) — monorepo layout and data flow

If [docs/project-brief.md](../docs/project-brief.md) exists, read it before planning product or feature work.

## Stack

| Layer | Technology | Location |
|-------|-----------|----------|
| Frontend | TanStack Start (React, SSR) | `frontend/` |
| UI | shadcn/ui + Tailwind CSS v4 | `frontend/src/components/ui/` |
| Backend | Convex (queries, mutations) | `backend/convex/` |
| HTTP API | Hono + OpenAPI + Scalar | `backend/convex/http.ts` |

## Workflow

- Use `staging` as the integration branch for feature work.
- Create short-lived branches (`feat/*`, `fix/*`, `chore/*`) from `staging`.
- Open small, focused PRs into `staging`; promote to `main` only for release.
- See [docs/git-workflow-beginner.md](../docs/git-workflow-beginner.md) and [CONTRIBUTING.md](../CONTRIBUTING.md).

## Verification

Before opening a PR, run:

```bash
npm run check
```

While iterating, narrower scripts are fine (`npm run lint`, `npm run typecheck`, `npm run test`).

## Agent skills

Use project commands (`.claude/commands/`) or read skills directly in `.cursor/skills/<name>/SKILL.md`:

| Skill | When to use |
|-------|-------------|
| `check-pr` | One-shot PR readiness check (CI, Qodo, description) |
| `qodo-loop` | Loop until Qodo Action required is clear and CI passes |
| `code-simplifier` | Clean up recently modified code without changing behavior |
| `code-structure` | Refactoring shared logic into service layer |
| `frontend-component-architecture` | Component placement, shadcn usage, feature folders |

Do not duplicate skill content here — follow the canonical skill files.

## Feature pattern

- Backend: `backend/convex/src/<feature>/` (queries, mutations, optional http)
- Frontend: `frontend/src/features/<feature>/` (components, hooks)
- Routes: `frontend/src/routes/` (page assembly only)

## Source of truth

`AGENTS.md` and `.cursor/skills/*/SKILL.md` are canonical. This file and `.claude/commands/` are thin wrappers — update the canonical files when guidance changes.
