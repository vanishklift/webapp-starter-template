---
name: check-pr
description: >
  Checks a GitHub pull request for unresolved review comments, failing status checks,
  and incomplete PR descriptions. Waits for pending checks, categorizes issues as
  actionable or informational, and optionally fixes them. Use when preparing a PR for
  review, addressing feedback, or verifying CI status before merge.
license: MIT
compatibility: Requires git and gh CLI installed and authenticated.
metadata:
  author: workbench
  version: "2.0"
allowed-tools: Bash(gh:*) Bash(git:*)
---

# Check PR

Analyze a pull request for review comments, status checks, and description completeness, then help address any issues found. This skill is a **one-shot triage** — it does not start a fix/re-review loop.

## When to use

| Situation | Use `check-pr`? |
|-----------|-----------------|
| Before requesting human review | Yes |
| After pushing fixes to see what's left | Yes |
| Reviewers left comments and you want a structured triage | Yes |
| You are still writing the feature locally | No — finish and push first |

## Inputs

- **PR number** (optional): If not provided, detect the PR for the current branch.

## Instructions

### 1. Identify the PR

If a number was provided, use it. Otherwise:

```bash
gh pr view --json number -q .number
```

### 2. Check local push status

Only consider **tracked** files (`git diff --name-only` and `git diff --cached --name-only`). Warn if there are uncommitted or unpushed changes because they are not part of the remote PR.

### 3. Fetch PR details

```bash
gh pr view <PR_NUMBER> --json title,body,state,reviews,comments,headRefName,statusCheckRollup
gh api repos/{owner}/{repo}/pulls/<PR_NUMBER>/comments
gh api --paginate "repos/{owner}/{repo}/issues/<PR_NUMBER>/comments?per_page=100"
```

### 4. Wait for pending CI checks

Poll every 30 seconds until all checks in `statusCheckRollup` reach a terminal state.

### 5. Analyze

- **Status checks:** Are all required CI checks passing?
- **Description:** Is the PR template complete?
- **Review comments:** Inline and general review threads from teammates.

### 6. Categorize issues

| Category | Meaning |
|----------|---------|
| **Actionable** | CI failures, incomplete description, or actionable human feedback |
| **Informational** | FYIs that don't require changes |
| **Already addressed** | Resolved by subsequent commits |

### 7. Report findings

Present a summary table with area, issue, status, and action needed.

Recommend next steps:

- **Ready for human review** — CI is green and no actionable feedback remains
- **Address feedback** — actionable review items remain

### 8. Fix issues (if requested)

By default this skill is read-only. Only apply fixes when the user explicitly asks.

1. Switch to the PR branch if not already on it.
2. Make fixes, commit, and push:

```bash
git add <files>
git commit -m "fix: address review feedback"
git push
```

### 9. Resolve review threads

Fetch unresolved thread IDs via GraphQL, then resolve addressed threads:

```bash
gh api graphql -f query='
mutation {
  resolveReviewThread(input: {threadId: "THREAD_ID"}) {
    thread { isResolved }
  }
}'
```

## Output format

Summarize:

- PR title and current state
- Status checks summary (passing/failing/pending)
- Total issues found by category
- Actionable items with descriptions
- Recommended next steps
