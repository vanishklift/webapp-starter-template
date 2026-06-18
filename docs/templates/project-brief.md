# {{PROJECT_NAME}}

> Living project brief for humans and AI agents. Update this document as the product evolves.

**Last updated:** {{LAST_UPDATED}}

## Project Snapshot

| Field | Value |
|-------|-------|
| **Name** | {{PROJECT_NAME}} |
| **Pitch** | {{PITCH}} |
| **Target users** | {{TARGET_USERS}} |
| **Problem** | {{PROBLEM}} |

## Product Goals

### Version 1 outcomes

{{V1_OUTCOMES}}

### Success criteria

{{SUCCESS_CRITERIA}}

### Non-goals (for now)

- Replace the starter task demo until the first real feature is ready.
- Premature optimization or large refactors before core workflows exist.

## User Workflows

### Primary workflow

{{PRIMARY_WORKFLOW}}

## Domain Model

Core entities discovered so far:

{{CORE_ENTITIES}}

## Feature Roadmap

### Planned

{{PLANNED_FEATURES}}

### In progress

- _None yet._

### Completed

- Starter template: sample `tasks` feature (replace or extend as the product takes shape).

## Product Constraints

| Area | Notes |
|------|-------|
| **Authentication and roles** | {{AUTH_ROLES}} |
| **External integrations** | {{INTEGRATIONS}} |
| **Data sensitivity** | {{DATA_SENSITIVITY}} |
| **Tone and UI style** | {{PRODUCT_TONE}} |

## Architecture Notes

This project builds on the Workbench starter stack:

- **Frontend:** TanStack Start, TanStack Router, shadcn/ui, Tailwind CSS v4
- **Backend:** Convex (queries, mutations, schema)
- **HTTP API:** Hono + OpenAPI + Scalar
- **Quality:** ESLint, Prettier, TypeScript, Vitest

See [starter-architecture.md](../starter-architecture.md) for monorepo layout and data flow.

Project-specific architecture decisions belong in the **Decisions** section below.

## Decisions

| Date | Decision | Reason | Impact |
|------|----------|--------|--------|
| {{LAST_UPDATED}} | Initial project brief created via `npm run init-project` | Capture product direction before building | Agents and contributors share one source of truth |

## Open Questions

{{OPEN_QUESTIONS}}

## Agent Notes

Instructions for AI coding agents working on this project:

1. Read this brief before planning product or feature work.
2. Align new features with **User Workflows** and **Product Goals**.
3. Update **Domain Model**, **Feature Roadmap**, and **Decisions** when you add meaningful functionality or make product choices.
4. Move resolved items out of **Open Questions** into **Decisions**.
5. Keep detailed implementation notes in code and [starter-architecture.md](../starter-architecture.md); use this brief for _what_ and _why_, not every _how_.
