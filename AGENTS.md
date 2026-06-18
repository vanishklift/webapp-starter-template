# AGENTS.md

Instructions for AI coding agents working with this codebase.

## Branch and PR Workflow

Use `staging` as the integration branch for feature work.

- Create feature branches from the latest `staging`, preferably in isolated worktrees under `./worktrees/<branch-name>` (gitignored; create the directory locally as needed).
- Open small, focused PRs from each feature branch into `staging`.
- Do not merge unrelated feature work into another feature branch unless the PR is intentionally stacked and the dependency is real.
- Keep PRs reviewable for code review agents: split by feature, ownership boundary, or behavioral surface rather than accumulating a large mixed diff.
- After a feature PR merges into `staging`, update any active feature branches from `staging` before continuing work.
- Promote `staging` to `main` only when the integrated set of changes is ready for release.

## Agent skills

| Skill | Location | When to use |
|-------|----------|-------------|
| `check-pr` | `.cursor/skills/check-pr/SKILL.md` | One-shot PR readiness check (CI, Greptile, description) |
| `greploop` | `.cursor/skills/greploop/SKILL.md` | Loop until Greptile 5/5 with zero comments |
| `code-simplifier` | `.cursor/skills/code-simplifier/SKILL.md` | Clean up recently modified code without changing behavior |
| `code-structure` | `.cursor/skills/code-structure/SKILL.md` | Refactoring shared logic into service layer |
| `frontend-component-architecture` | `.cursor/skills/frontend-component-architecture/SKILL.md` | Component placement, shadcn usage, feature folders |

## Source Code Reference

Source code for dependencies is available in `opensrc/` for deeper understanding of implementation details.

The canonical source list is in [tools/opensrc-stack.txt](tools/opensrc-stack.txt). Sync all entries with:

```bash
npm run opensrc:sync
```

See [docs/stack-source-repos.md](docs/stack-source-repos.md) for the human-readable inventory and rationale.

opensrc manages its own cache metadata in `opensrc/sources.json` (gitignored, generated on fetch).

## Fetching Additional Source Code

To sync the full stack manifest:

```bash
npm run opensrc:sync
```

For one-off fetches not in the manifest:

```bash
npx opensrc fetch <package>          # npm package
npx opensrc fetch pypi:<package>     # Python package
npx opensrc fetch crates:<package>   # Rust crate
npx opensrc fetch <owner>/<repo>     # GitHub repo
```

Fetched sources land under `opensrc/`. The directory is gitignored — it is a local reference cache.

See [docs/opensrc-workflow.md](docs/opensrc-workflow.md) for the full workflow.

## Architecture

See [docs/starter-architecture.md](docs/starter-architecture.md) for monorepo layout, data flow, and feature-folder patterns.
