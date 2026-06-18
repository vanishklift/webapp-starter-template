---
name: check-pr
description: >
  Checks a GitHub pull request for unresolved review comments, failing status checks,
  and incomplete PR descriptions. Waits for pending checks, categorizes issues as
  actionable or informational, and optionally fixes them. Use when preparing a PR for
  review, addressing feedback, or verifying CI and Greptile status before merge.
license: MIT
compatibility: Requires git and gh CLI installed and authenticated.
metadata:
  author: greptileai
  version: "1.3"
  source: https://github.com/greptileai/skills/tree/main/check-pr
allowed-tools: Bash(gh:*) Bash(git:*)
---

# Check PR

Analyze a pull request for review comments, status checks, and description completeness, then help address any issues found.

## When to use

| Situation | Use `check-pr`? |
|-----------|-----------------|
| Before requesting human review | Yes |
| After pushing fixes to see what's left | Yes |
| Greptile left many comments and you want a structured triage | Yes |
| You want Greptile to auto-fix in a loop until 5/5 | No — use `greploop` instead |
| You are still writing the feature locally | No — finish and push first |

## Inputs

- **PR number** (optional): If not provided, detect the PR for the current branch.

## Instructions

### 1. Identify the PR

If a number was provided, use it. Otherwise:

```bash
gh pr view --json number -q .number
```

### 2. Fetch PR details

```bash
gh pr view <PR_NUMBER> --json title,body,state,reviews,comments,headRefName,statusCheckRollup
gh api repos/{owner}/{repo}/pulls/<PR_NUMBER>/comments
gh api --paginate "repos/{owner}/{repo}/issues/<PR_NUMBER>/comments?per_page=100"
```

Greptile may edit a single general PR comment on each review cycle. Always inspect the latest Greptile-authored comment by `updated_at`.

### 3. Wait for pending checks

Poll every 30 seconds until all checks reach a terminal state (`statusCheckRollup` from `gh pr view`).

### 4. Analyze

- **Status checks:** Are all CI checks passing?
- **Description:** Is the PR template complete?
- **Review comments:** Inline code comments, Greptile bot comments, human reviewer comments.
- **General comments:** Issue comments including Greptile summary edits.

### 5. Categorize issues

| Category | Meaning |
|----------|---------|
| **Actionable** | Code changes, test improvements, or fixes needed |
| **Informational** | FYIs that don't require changes |
| **Already addressed** | Resolved by subsequent commits |

### 6. Report findings

Present a summary table with area, issue, status, and action needed.

### 7. Fix issues (if requested)

1. Switch to the PR branch if not already on it.
2. Make fixes, commit, and push:

```bash
git add <files>
git commit -m "fix: address review feedback"
git push
```

### 8. Resolve review threads

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
- Total issues found
- Actionable items with descriptions
- Recommended next steps
