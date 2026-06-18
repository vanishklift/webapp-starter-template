---
name: code-simplifier
description: >
  Simplifies and refines recently modified code for clarity, consistency, and
  maintainability while preserving all functionality. Use after substantial edits
  or before opening a PR to clean up agent-generated code.
license: MIT
metadata:
  source: https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-simplifier
---

# Code Simplifier

Enhance code clarity and consistency without changing behavior. Focus on recently modified files unless instructed otherwise.

## When to use

| Situation | Use `code-simplifier`? |
|-----------|------------------------|
| After a large agent-generated change | Yes |
| Before opening a PR with messy diff | Yes |
| After `greploop` fixed many comments and code feels scattered | Yes |
| During active feature development (mid-edit) | No — wait until a logical stopping point |
| Greptile/CI found a real bug | No — fix the bug directly |

## Workbench standards

When simplifying, follow this repo's conventions:

- TypeScript with strict mode
- React components with explicit props types
- Convex: feature folders under `backend/convex/src/<feature>/`
- Frontend UI: shadcn/ui components from `@/components/ui`
- Shared logic: see `.cursor/skills/code-structure/SKILL.md`
- Full sentences with punctuation in comments and user-facing messages

## Refinement rules

1. **Preserve functionality** — never change what the code does, only how.
2. **Enhance clarity** — reduce nesting, eliminate redundancy, improve naming.
3. **Avoid over-simplification** — don't combine unrelated concerns or remove helpful abstractions.
4. **No nested ternaries** — prefer `if/else` or early returns.
5. **Scope** — only refine recently modified code unless told otherwise.

## Process

1. Identify recently modified sections (check git diff).
2. Analyze for clarity and consistency opportunities.
3. Apply refinements following workbench standards.
4. Verify behavior is unchanged (lint, test, manual check).
5. Document only significant changes that affect understanding.
