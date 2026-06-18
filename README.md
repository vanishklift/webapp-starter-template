# Workbench

Full-stack starter for team projects: **TanStack Start** frontend + **Convex** backend with **Hono HTTP API**, **shadcn/ui**, and agent skills.

## Quick start

### 1. Clone

```bash
git clone https://github.com/vanishklift/workbench.git
cd workbench
```

### 2. Install everything (root + frontend + backend)

```bash
npm run install:all
```

### 3. Define your project (recommended)

Run the guided intake to create a living project brief for your team and AI agents:

```bash
npm run init-project
```

This writes [docs/project-brief.md](docs/project-brief.md) with your app name, target users, core workflows, domain entities, and v1 feature goals. Re-run anytime to append a dated update — the script never overwrites an existing brief unless you explicitly confirm it.

Commit the brief so agents and teammates share the same product direction.

Prefer one command to do both install + intake in sequence:

```bash
npm run bootstrap
```

### 4. Start Convex (backend)

```bash
npm run dev:backend
```

- Log in with GitHub when prompted (first time only).
- Convex creates a dev deployment and prints a URL like `https://your-deployment.convex.cloud`.
- Copy that URL into `frontend/.env.local`:

```bash
# frontend/.env.local
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

### 5. (Optional) Import sample tasks

In a second terminal:

```bash
npm --prefix backend exec convex import --table tasks backend/sampleData.jsonl
```

### 6. Start the frontend

```bash
npm run dev:frontend
```

Open [http://localhost:3000](http://localhost:3000).

### 7. Run both together

```bash
npm run dev
```

### 8. (Optional) View HTTP API docs

When the backend is running, visit your Convex deployment URL:

- **API docs:** `<deployment-url>/api/scalar`
- **OpenAPI spec:** `<deployment-url>/api/openapi`

## Project structure

```
workbench/
├── frontend/          # TanStack Start app (React, shadcn/ui, Tailwind)
├── backend/
│   └── convex/        # Convex schema, queries, mutations, Hono HTTP API
├── docs/              # Team guides, architecture, checklists
├── .cursor/skills/    # Agent skills (Greptile, code-simplifier, etc.)
├── .claude/           # Claude Code project config and slash commands
├── .codex/            # Codex prompt playbooks and onboarding
├── .github/           # PR templates, CI, branch setup notes
└── convex.json        # Convex CLI config (functions → backend/convex)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend + Convex dev servers |
| `npm run dev:frontend` | TanStack Start on port 3000 |
| `npm run dev:backend` | Convex dev (syncs functions, HTTP API) |
| `npm run build` | Build frontend for production |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (frontend + backend) |
| `npm run test` | Vitest (frontend + backend) |
| `npm run check` | Format, lint, typecheck, and test |
| `npm run format` | Prettier + ESLint fix |
| `npm run install:all` | Install root, frontend, and backend dependencies |
| `npm run bootstrap` | Install everything, then launch project intake |
| `npm run init-project` | Guided intake — create or update `docs/project-brief.md` |
| `npm run opensrc:sync` | Fetch stack source refs into local `opensrc/` cache |

## Git workflow

We use **`main`** (production) and **`staging`** (integration). All work happens on short-lived branches.

**Read the full beginner guide:** [docs/git-workflow-beginner.md](docs/git-workflow-beginner.md)

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `staging` | Integration / pre-release testing |
| `feat/*`, `fix/*`, `chore/*` | Your task branches |

## References and tools

| Resource | Link | Use for |
|----------|------|---------|
| Architecture | [docs/starter-architecture.md](docs/starter-architecture.md) | How the stack fits together |
| Greptile | [docs](https://www.greptile.com/docs/introduction) | AI PR review on every pull request |
| Convex | [docs](https://docs.convex.dev/home) | Backend, database, real-time queries |
| TanStack | [tanstack.com](https://tanstack.com/) | Router, Start, Query |
| shadcn/ui | [ui.shadcn.com](https://ui.shadcn.com/) | UI components |
| opensrc | [GitHub](https://github.com/vercel-labs/opensrc) | Fetch npm/repo source for AI agents |
| code-structure | [GitHub](https://github.com/michaelshimeles/skills) | Service-layer architecture patterns |

### Agent skills

| Skill | When to use |
|-------|-------------|
| `check-pr` | One-shot PR readiness check before human review |
| `greploop` | Loop until Greptile 5/5 confidence with zero comments |
| `code-simplifier` | Clean up recently modified code before opening PR |
| `code-structure` | Refactoring shared logic into service layer |
| `frontend-component-architecture` | Component placement, shadcn usage, feature folders |

Skills live in `.cursor/skills/<name>/SKILL.md`.

Tool-specific wrappers (reference the skills above; do not duplicate guidance):

| Tool | Location | Use for |
|------|----------|---------|
| Claude Code | `.claude/commands/<name>.md` | Slash commands (`/project:check-pr`, etc.) |
| Codex | `.codex/prompts/<name>.md` | Copy-paste prompt playbooks |

### opensrc (optional, for AI coding)

Sync upstream source for stack packages from the tracked manifest:

```bash
npm run opensrc:sync
```

This reads [tools/opensrc-stack.txt](tools/opensrc-stack.txt) and fetches all listed sources into the gitignored `opensrc/` cache.

See [docs/opensrc-workflow.md](docs/opensrc-workflow.md) and [docs/stack-source-repos.md](docs/stack-source-repos.md).

## Team onboarding

1. Run `npm run init-project` and commit [docs/project-brief.md](docs/project-brief.md) — what you're building and why.
2. Read [docs/starter-architecture.md](docs/starter-architecture.md) — how everything fits together.
3. Read [docs/git-workflow-beginner.md](docs/git-workflow-beginner.md) (includes a visual flow diagram).
4. Follow [docs/checklists/pr-checklist.md](docs/checklists/pr-checklist.md) before every PR.
5. See [CONTRIBUTING.md](CONTRIBUTING.md) for branch rules and conventions.
6. Review [docs/starter-decisions.md](docs/starter-decisions.md) for stack choices.

## GitHub setup (repo admin)

After pushing to GitHub, configure branch protection — see [.github/BRANCH_SETUP.md](.github/BRANCH_SETUP.md).
