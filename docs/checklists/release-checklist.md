# Release checklist

Use when promoting **`staging` → `main`** (production).

## Before the release PR

- [ ] All planned features for this release are merged into `staging`
- [ ] `staging` CI is green on the latest commit
- [ ] Team tested on staging environment (or local `staging` branch)
- [ ] No known critical bugs open for this release
- [ ] Convex production deploy planned if backend changed (`npm --prefix backend run deploy`)

## Opening the release PR

- [ ] GitHub: New PR — **base `main`**, **compare `staging`**
- [ ] Title: `release: promote staging to main` (or `release: v0.2.0`)
- [ ] Describe what ships in this release (bullet list)
- [ ] At least one teammate reviews

## After merge to `main`

- [ ] Tag release if you use versions: `git tag v0.2.0 && git push origin v0.2.0`
- [ ] Deploy frontend/backend to production (when hosting is configured)
- [ ] Announce to team what shipped
- [ ] `git checkout staging && git pull` locally

## If something breaks in production

1. Fix on a `fix/...` branch from `staging` (or hotfix process your team agrees on).
2. Merge fix to `staging`, verify, then release `staging` → `main` again.
3. Do **not** skip `staging` unless it's a true emergency — document why.
