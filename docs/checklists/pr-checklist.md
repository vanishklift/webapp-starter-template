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
- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] Manually tested the change in the browser
- [ ] Commit messages are clear (`feat:`, `fix:`, `chore:`)
- [ ] PR **base branch is `staging`** (not `main`)
- [ ] PR title matches the change
- [ ] PR template checklist filled in

## Reviewing a teammate's PR

- [ ] Read the PR description — does it match the code?
- [ ] Check CI is green (lint, test, build)
- [ ] Read Greptile comments — agree/disagree; don't ignore blindly
- [ ] Pull branch locally if needed: `git fetch && git checkout feat/branch-name`
- [ ] Leave constructive comments or approve
- [ ] Merge with squash when ready

## After merge

- [ ] Delete the feature branch on GitHub (optional but tidy)
- [ ] `git checkout staging && git pull` on your machine
