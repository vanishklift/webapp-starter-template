# Codex — project configuration

Codex loads project instructions automatically from `AGENTS.md` at the repo root. This folder adds onboarding notes and reusable prompt playbooks — it does not replace the canonical guidance.

## How Codex reads instructions

Codex merges instructions top-down:

1. `~/.codex/AGENTS.md` — personal global preferences
2. `AGENTS.md` at repo root — shared team guidance (canonical)
3. `AGENTS.md` in the current working directory — subdirectory specifics (optional)

Verify what Codex loaded:

```bash
codex --print-instructions
```

Disable project docs temporarily:

```bash
codex --no-project-doc
```

## Prompt playbooks

Use the files in `prompts/` as copy-paste starting points. Each references the canonical skill in `.cursor/skills/<name>/SKILL.md`:

| Prompt | Skill |
|--------|-------|
| `prompts/check-pr.md` | PR readiness check |
| `prompts/greploop.md` | Greploop until Greptile 5/5 |
| `prompts/simplify.md` | Code simplifier |
| `prompts/code-structure.md` | Service-layer refactoring |
| `prompts/frontend-architecture.md` | Frontend component placement |

## Verification

Before opening a PR:

```bash
npm run check
```

## Optional local config

See `config.example.toml` for safe personal settings you can copy into `~/.codex/config.toml`. Do not commit your personal Codex config to this repo.

## Canonical guidance

- [AGENTS.md](../AGENTS.md) — shared agent instructions
- `.cursor/skills/*/SKILL.md` — detailed playbooks
- [docs/starter-architecture.md](../docs/starter-architecture.md) — stack overview

Do not fork guidance into this folder. Reference and link instead.
