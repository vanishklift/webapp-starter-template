# GitHub branch setup

Follow these steps after the repository exists on GitHub (`https://github.com/vanishklift/workbench`).

## 1. Create branches

If `main` already exists and `staging` does not:

```bash
git checkout main
git pull origin main
git checkout -b staging
git push -u origin staging
```

## 2. Set default branch (optional)

For day-to-day development, set **default branch** to `staging` in GitHub:

**Settings → General → Default branch → `staging`**

Developers still promote `staging` → `main` for releases.

## 3. Protect `main`

**Settings → Branches → Add branch protection rule**

Branch name pattern: `main`

| Setting | Value |
|---------|-------|
| Require a pull request before merging | Yes |
| Required approvals | 1 (or 2 for stricter teams) |
| Require status checks to pass | Yes (after CI is enabled) |
| Require branches to be up to date | Yes |
| Do not allow bypassing | Yes |
| Restrict direct pushes | Yes |

## 4. Protect `staging`

Branch name pattern: `staging`

| Setting | Value |
|---------|-------|
| Require a pull request before merging | Yes |
| Required approvals | 1 |
| Require status checks to pass | Yes |
| Do not allow bypassing | No (optional — allows hotfix merges by admins) |

## 5. Merge strategy

**Settings → General → Pull Requests**

- Enable **Allow squash merging** (recommended for beginners — one commit per PR).
- Disable merge commits if you want a linear history.

## 6. Connect Greptile

1. Go to [Greptile quickstart](https://www.greptile.com/docs/quickstart).
2. Install the GitHub app.
3. Select the `workbench` repository.
4. Greptile will review every PR automatically (~3 minutes).

## 7. Verify

- [ ] `main` and `staging` exist on GitHub
- [ ] Direct push to `main` is blocked
- [ ] PR template appears when opening a pull request
- [ ] CI workflow runs on PRs to `staging` and `main`
- [ ] Greptile comments on test PRs
