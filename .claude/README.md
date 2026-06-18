# Claude Code — project configuration

This folder gives Claude Code users repo-specific onboarding and slash commands. It is committed to git so the whole team shares the same setup.

## What is committed

| Path | Purpose |
|------|---------|
| `CLAUDE.md` | Project instructions loaded every session |
| `settings.json` | Conservative project defaults (no hooks, no broad allowlist) |
| `commands/*.md` | Slash commands that wrap `.cursor/skills` playbooks |

## What stays local

| Path | Purpose |
|------|---------|
| `.claude/settings.local.json` | Personal permission overrides (gitignored when Claude creates it) |
| `CLAUDE.local.md` | Personal instructions not shared with the team |

## Slash commands

| Command | Skill |
|---------|-------|
| `/project:check-pr` | PR readiness check |
| `/project:greploop` | Greploop until Greptile 5/5 |
| `/project:simplify` | Code simplifier |
| `/project:code-structure` | Service-layer refactoring |
| `/project:frontend-architecture` | Frontend component placement |

Each command points at the canonical skill in `.cursor/skills/<name>/SKILL.md`. Edit the skill file when workflow guidance changes; keep commands as thin wrappers.

## Canonical guidance

- [AGENTS.md](../AGENTS.md) — shared agent instructions (also used by Codex)
- `.cursor/skills/*/SKILL.md` — detailed playbooks

Do not fork guidance into this folder. Reference and link instead.
