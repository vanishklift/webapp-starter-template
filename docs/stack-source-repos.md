# Stack source repos (opensrc)

This document lists the canonical upstream GitHub repos for the Workbench stack. Use these with [opensrc](https://github.com/vercel-labs/opensrc) to fetch local source references for debugging and AI-assisted development.

Fetched sources are stored locally under `opensrc/`. The `opensrc/` directory is gitignored — it is a local cache, not committed code.

## How to fetch

**Recommended:** sync all manifest entries in one command:

```bash
npm run opensrc:sync
```

This reads [tools/opensrc-stack.txt](../tools/opensrc-stack.txt) and fetches every listed package/repo into project-local `opensrc/`.

For individual fetches:

```bash
npx opensrc fetch <owner>/<repo>
npx opensrc fetch convex
```

See [docs/opensrc-workflow.md](opensrc-workflow.md) for the full workflow and pinning policy.

## Stack inventory

The executable list is in [tools/opensrc-stack.txt](../tools/opensrc-stack.txt). This table explains what each source is for:

| Source | Packages / reason |
|--------|-------------------|
| `convex` | Convex backend, client, CLI |
| `convex-helpers` | Hono integration, utilities |
| `hono` | Hono HTTP framework |
| `@hono/zod-validator` | Hono request validation |
| `@scalar/hono-api-reference` | Scalar API docs UI |
| `@tanstack/react-router` | TanStack Router |
| `@tanstack/react-query` | TanStack Query |
| `@tanstack/react-start` | TanStack Start |
| `vite` | Vite bundler |
| `tailwindcss` | Tailwind CSS v4 |
| `lucide-react` | Lucide icons |
| `vitest` | Vitest test runner |
| `eslint` | ESLint |
| `prettier` | Prettier |
| `shadcn-ui/ui#main` | shadcn/ui components and registry |
| `greptileai/skills#main` | Greptile agent skills source |
| `jaycmpb/convex-starter#main` | Reference starter (Hono HTTP API patterns) |
| `vercel-labs/opensrc#main` | opensrc tool itself |

Additional repos you may fetch on demand (not in the default manifest):

| Repo | Reason |
|------|--------|
| `get-convex/convex-backend` | Full Convex backend monorepo |
| `TanStack/router` | TanStack Router monorepo |
| `TanStack/query` | TanStack Query monorepo |
| `nitrojs/nitro` | Nitro server adapter |
| `facebook/react` | React and React DOM |
| `posthog/posthog` | PostHog error logging reference |
| `anthropics/claude-plugins-official` | Original `code-simplifier` source |

## When to fetch

- Debugging how a library works internally
- Validating AI-generated code against upstream patterns
- Reviewing API surface before integrating a new feature
- Understanding error handling or middleware behavior

## When NOT to fetch

- For code you plan to copy into the repo — vendor into tracked paths instead (e.g. `.cursor/skills/`)
- For every dependency — only fetch what you actively need to inspect

## Updating the manifest

When adding a new stack dependency worth inspecting locally, add it to `tools/opensrc-stack.txt` and run `npm run opensrc:sync`. Prefer package names for npm deps; use `owner/repo@tag` or `#main` for repo-only references.
