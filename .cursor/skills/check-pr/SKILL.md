---
name: check-pr
description: >
  Checks a GitHub pull request for unresolved review comments, failing status checks,
  and incomplete PR descriptions. Waits for pending checks, categorizes issues as
  actionable or informational, and optionally fixes them. Use when preparing a PR for
  review, addressing feedback, or verifying CI and Qodo status before merge.
license: MIT
compatibility: Requires git and gh CLI installed and authenticated.
metadata:
  author: workbench
  version: "2.0"
  adapted-from: https://github.com/qodo-ai/qodo-skills/tree/main/skills/qodo-pr-resolver
allowed-tools: Bash(gh:*) Bash(git:*)
---

# Check PR

Analyze a pull request for review comments, status checks, and description completeness, then help address any issues found. This skill is a **one-shot triage** — it does not start a fix/re-review loop.

## When to use

| Situation | Use `check-pr`? |
|-----------|-----------------|
| Before requesting human review | Yes |
| After pushing fixes to see what's left | Yes |
| Qodo left findings and you want a structured triage | Yes |
| You want an automated fix → push → re-review loop | No — use `qodo-loop` instead |
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

Only consider **tracked** files (`git diff --name-only` and `git diff --cached --name-only`). Warn if there are uncommitted or unpushed changes — Qodo reviews remote HEAD only.

### 3. Fetch PR details

```bash
gh pr view <PR_NUMBER> --json title,body,state,reviews,comments,headRefName,statusCheckRollup
gh api repos/{owner}/{repo}/pulls/<PR_NUMBER>/comments
gh api --paginate "repos/{owner}/{repo}/issues/<PR_NUMBER>/comments?per_page=100"
```

### 4. Wait for pending CI checks

Poll every 30 seconds until all checks in `statusCheckRollup` reach a terminal state.

### 5. Detect Qodo review

Look for comments from: `qodo-merge[bot]`, `qodo-ai[bot]`, `pr-agent-pro`, `pr-agent-pro-staging`.

Qodo typically posts both a **summary comment** and **inline review comments**. Fetch both.

**Review status:**

| Signal | Meaning |
|--------|---------|
| Comment contains "Come back again in a few minutes" or "An AI review agent is analysing" | Still running — optionally wait up to 10 minutes (poll every 30s) |
| No Qodo bot comments at all | Not started — report "run `/agentic_review` or use `qodo-loop`" |
| Qodo comments present, no in-progress markers | Ready — parse findings |

Do **not** rely on `gh pr checks` as the primary Qodo detector — Qodo may not appear there.

### 6. Analyze

- **Status checks:** Are all required CI checks passing?
- **Description:** Is the PR template complete?
- **Qodo findings:** Parse buckets from summary markup (badge slug labels such as `Action_required`, `Review_recommended`, `Optional`, or plain-text "Great, no actions required"). Deduplicate summary + inline by **issue title** (inline wins for location; summary wins for agent prompt). Preserve exact titles. Ignore struck-through / Resolved findings.
- **Human comments:** Inline and general review threads from teammates.

### 7. Categorize issues

| Category | Meaning |
|----------|---------|
| **Actionable** | CI failures, incomplete description, Qodo **Action required**, Qodo **Review recommended**, actionable human feedback |
| **Informational** | Qodo **Optional** / advisory findings, FYIs that don't require changes |
| **Already addressed** | Resolved by subsequent commits or struck through by Qodo |

Do not invent severity. Read Qodo's bucket labels literally.

### 8. Report findings

Present a summary table with area, issue, status, and action needed.

Recommend next steps:

- **Ready for human review** — CI green, no Action required, Review recommended empty or acknowledged
- **Run `qodo-loop`** — multiple actionable Qodo items remain
- **Trigger `/agentic_review`** — no Qodo output yet

### 9. Fix issues (if requested)

By default this skill is read-only. Only apply fixes when the user explicitly asks.

1. Switch to the PR branch if not already on it.
2. Make fixes, commit, and push:

```bash
git add <files>
git commit -m "fix: address review feedback"
git push
```

### 10. Resolve review threads

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
- Qodo review status (not started / in progress / ready)
- Total issues found by category
- Actionable items with descriptions
- Recommended next steps
