# PR checklist

Copy this when working on a task or reviewing a teammate's PR.

## Starting work

- [ ] `git checkout staging`
- [ ] `git pull origin staging`
- [ ] `git checkout -b feat/your-task-name` (or `fix/`, `chore/`)
- [ ] App runs locally (`npm run dev` or `npm run dev:frontend` + `npm run dev:backend`)
- [ ] `frontend/.env.local` has `VITE_CONVEX_URL` (from Convex dev)

## Before opening a PR

- [ ] Branch is up to date with `staging` (merge if needed)
- [ ] `npm run check` passes (format, lint, typecheck, test)
- [ ] Manually tested the change in the browser
- [ ] Commit messages are clear (`feat:`, `fix:`, `chore:`)
- [ ] PR **base branch is `staging`** (not `main`)
- [ ] PR title matches the change
- [ ] PR template checklist filled in
- [ ] (Optional) Ran **code-simplifier** skill on recently modified files

## After opening a PR (Greptile + agent skills)

- [ ] Wait for Greptile review (~3 minutes)
- [ ] Run **check-pr** skill to triage CI status, Greptile comments, and description completeness
- [ ] Fix actionable items and push again
- [ ] If Greptile still has multiple rounds of feedback → run **greploop** skill
- [ ] Read each Greptile comment — fix or reply with reasoning
- [ ] Request review from a teammate

## Reviewing a teammate's PR

- [ ] Read the PR description — does it match the code?
- [ ] Check CI is green (format, lint, typecheck, test, build)
- [ ] Read Greptile comments — agree/disagree; don't ignore blindly
- [ ] Pull branch locally if needed: `git fetch && git checkout feat/branch-name`
- [ ] Leave constructive comments or approve
- [ ] Merge with squash when ready

## After merge

- [ ] Delete the feature branch on GitHub (optional but tidy)
- [ ] `git checkout staging && git pull` on your machine

## Agent skills quick reference

| Skill | When |
|-------|------|
| `check-pr` | One-shot PR readiness check |
| `greploop` | Loop until Greptile 5/5 with zero comments |
| `code-simplifier` | Clean up code without changing behavior |
| `code-structure` | Refactoring shared logic |

Skills: `.cursor/skills/<name>/SKILL.md` — requires `gh auth login` for PR skills.
