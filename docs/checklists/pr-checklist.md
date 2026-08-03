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

## After opening a PR (Qodo + agent skills)

- [ ] Comment `/agentic_review` on the PR (asks Qodo to review the current remote HEAD)
- [ ] Run **check-pr** skill to triage CI status, Qodo findings, and description completeness
- [ ] Fix actionable items and push again, **or** run **qodo-loop** if multiple rounds remain
- [ ] Read each Qodo finding — fix or reply with reasoning (do not follow blindly)
- [ ] Request review from a teammate when Action required = 0 and CI is green

### What each action does

| Action | What it does |
|--------|--------------|
| `/agentic_review` | Asks Qodo to review only the code currently pushed to the PR |
| `check-pr` | One-shot triage of CI, Qodo buckets, human comments, and PR description — does **not** start a fix loop |
| `qodo-loop` | Fix → push → `/agentic_review` loop (max 5 rounds) until Qodo is clean enough for humans |
| Reply on a thread | Records whether a finding was fixed or deferred (and why) |
| Resolve thread | Closes the GitHub conversation for that finding |
| Commit | Records the local code fix |
| Push | Updates the remote PR so the next Qodo review sees the fix |

### Qodo finding buckets

| Bucket | Default action |
|--------|----------------|
| Action required | Fix |
| Review recommended | Fix (or defer with a concrete reason) |
| Optional / informational | Defer or ignore |

## Reviewing a teammate's PR

- [ ] Read the PR description — does it match the code?
- [ ] Check CI is green (format, lint, typecheck, test, build)
- [ ] Read Qodo findings — agree/disagree; don't ignore blindly
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
| `qodo-loop` | Loop until Qodo Action required is clear and CI passes |
| `code-simplifier` | Clean up code without changing behavior |
| `code-structure` | Refactoring shared logic |

Skills: `.cursor/skills/<name>/SKILL.md` — requires `gh auth login` for PR skills.
