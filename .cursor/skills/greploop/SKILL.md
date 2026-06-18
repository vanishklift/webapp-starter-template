---
name: greploop
description: >
  Iteratively improves a PR until Greptile gives it a 5/5 confidence score with zero
  unresolved comments. Triggers Greptile review, fixes actionable comments, pushes,
  re-triggers review, and repeats. Use when Greptile feedback needs multiple cycles
  or confidence is below target.
license: MIT
compatibility: Requires git, gh CLI authenticated, and Greptile installed on the repo.
metadata:
  author: greptileai
  version: "1.3"
  source: https://github.com/greptileai/skills/tree/main/greploop
allowed-tools: Bash(gh:*) Bash(git:*)
---

# Greploop

Iteratively fix a PR until Greptile gives a perfect review: 5/5 confidence, zero unresolved comments.

## When to use

| Situation | Use `greploop`? |
|-----------|-----------------|
| Greptile confidence is below 5/5 and comments remain | Yes |
| Multiple rounds of Greptile feedback expected | Yes |
| You want an automated fix-push-re-review loop | Yes |
| First time checking a PR after opening it | No — use `check-pr` first |
| Only one minor Greptile comment | No — fix manually |

**Prerequisite:** Install and authenticate `gh` CLI (`gh auth login`).

## Inputs

- **PR number** (optional): If not provided, detect the PR for the current branch.

## Instructions

### 1. Identify the PR

```bash
gh pr view --json number,headRefName -q '{number: .number, branch: .headRefName}'
```

Switch to the PR branch if not already on it.

### 2. Loop (max 5 iterations)

#### A. Trigger Greptile review

```bash
git push
sleep 5
```

Check if Greptile is already running:

```bash
gh pr checks <PR_NUMBER> --json name,state
```

If not running, request a fresh review:

```bash
gh pr comment <PR_NUMBER> --body "@greptile review"
```

Poll until the Greptile check completes.

#### B. Fetch Greptile review results

Check all sources for the confidence score:
1. PR description body
2. General PR comments (issue comments) — prefer most recently updated Greptile comment
3. PR reviews from `greptile-apps[bot]`

Also fetch unresolved inline comments:

```bash
gh api repos/{owner}/{repo}/pulls/<PR_NUMBER>/comments
```

Parse for confidence score (`X/5`) and unresolved comment count.

#### C. Exit conditions

Stop if:
- Confidence is **5/5** AND zero unresolved comments
- Max iterations (5) reached

#### D. Fix actionable comments

For each unresolved Greptile comment, read context, fix if actionable, or note as false positive.

#### E. Resolve threads

Resolve addressed review threads via GraphQL `resolveReviewThread` mutation.

#### F. Commit and push

```bash
git add -A
git commit -m "fix: address greptile review feedback (greploop iteration N)"
git push
```

Go back to step A.

### 3. Report

| Field | Value |
|-------|-------|
| Iterations | N |
| Final confidence | X/5 |
| Comments resolved | N |
| Remaining comments | N |

## Output format

```
Greploop complete.
  Iterations:    2
  Confidence:    5/5
  Resolved:      7 comments
  Remaining:     0
```
