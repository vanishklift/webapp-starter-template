---
name: code-structure
description: Use when multiple workflows duplicate the same operational logic, when deciding what belongs in actions vs shared services, or when refactoring repeated operational blocks across domain flows. Use when adding new features that share mechanics with existing ones.
---

# Service Layer Architecture

Source: [michaelshimeles/skills](https://github.com/michaelshimeles/skills/tree/main/code-structure)

## Overview

**Two-layer separation:** Actions orchestrate domain rules (the "why/when"), while a service layer centralizes reusable operational mechanics (the "how").

This prevents duplicated code, inconsistent behavior, and bugs fixed in one path but not others.

## When to Use

- Multiple callers need the same low-level operation
- You're copy-pasting operational logic between files
- A bug fix in one workflow doesn't propagate to others
- Adding a new feature that shares mechanics with existing flows

**Don't use when:** Logic is truly domain-specific and used by only one caller.

## Core Pattern

```
Orchestration Layer (Actions)          Service Layer (Shared Mechanics)
├── owns business rules                ├── owns reusable operations
├── owns state transitions             ├── owns provider/SDK interactions
├── owns auth/ownership checks         ├── owns command execution details
├── owns failure classification        ├── owns health checks / readiness
├── owns retries / user-facing errors  └── returns structured results
└── calls service functions
```

**Rule of thumb:**
- "What this product flow means" → keep in actions / route handlers
- "How to do this operation reliably" → move to service layer

## In this repo

| Layer | Convex example | Frontend example |
|-------|----------------|------------------|
| Orchestration | `convex/tasks.ts` mutations with validation | Route components, loaders |
| Service | Shared helpers in `convex/lib/` | Shared utilities in `frontend/src/lib/` |

## Quick Reference

| Design Principle | Do | Don't |
|---|---|---|
| API shape | Composable capability blocks | One giant "do everything" method |
| Inputs/outputs | Explicit params, structured returns | Hidden global state |
| Migration | Extract one block, replace one caller, verify | Refactor everything at once |
| Domain logic | Keep auth, policy, errors in orchestration | Let service mutate domain state directly |

## Mental Model

```
New feature? → Write in action/route first → See repeated ops? → Extract to service
                                      → No repetition?  → Keep in place
```
