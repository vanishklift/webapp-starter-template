# Contributing to Workbench

Thank you for contributing. This is a beginner-friendly guide to how we work.

## Before you start

1. Read [docs/git-workflow-beginner.md](docs/git-workflow-beginner.md).
2. Install dependencies and run the app locally (see [README.md](README.md)).
3. Connect Greptile to the repo if you are a reviewer (see [Greptile quickstart](https://www.greptile.com/docs/quickstart)).

## Branch rules

| Branch | Who merges | How |
|--------|------------|-----|
| `feat/*` → `staging` | Any teammate after review | Pull request |
| `staging` → `main` | Release owner | Pull request (release) |

**Never push directly to `main` or `staging`.** Use pull requests.

## Branch naming

| Prefix | Example | When to use |
|--------|---------|-------------|
| `feat/` | `feat/login-page` | New feature |
| `fix/` | `fix/task-list-crash` | Bug fix |
| `chore/` | `chore/update-deps` | Tooling, docs, cleanup |

## Commit messages

Use short, clear messages:

```
feat: add task completion toggle
fix: handle empty Convex URL on startup
chore: document Greptile workflow
```

## Pull request checklist

Use [docs/checklists/pr-checklist.md](docs/checklists/pr-checklist.md) before opening a PR.

## Code structure

When refactoring shared logic across flows, follow the **code-structure** skill in `.cursor/skills/code-structure/SKILL.md` (from [michaelshimeles/skills](https://github.com/michaelshimeles/skills)):

- **Actions / route handlers** own business rules (when/why).
- **Service layer** owns reusable mechanics (how).

## Getting help

- Git workflow questions → [docs/git-workflow-beginner.md](docs/git-workflow-beginner.md)
- Convex → [docs.convex.dev](https://docs.convex.dev/home)
- TanStack → [tanstack.com](https://tanstack.com/)
