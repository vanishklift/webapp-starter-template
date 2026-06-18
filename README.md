# Workbench

Full-stack starter for team projects: **TanStack Start** frontend + **Convex** backend.

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/vanishklift/workbench.git
cd workbench
npm install
npm --prefix frontend install
npm --prefix backend install
```

### 2. Start Convex (backend)

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

### 3. (Optional) Import sample tasks

In a second terminal:

```bash
npx convex import --table tasks backend/sampleData.jsonl
```

### 4. Start the frontend

```bash
npm run dev:frontend
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Run both together

```bash
npm run dev
```

## Project structure

```
workbench/
├── frontend/          # TanStack Start app (React, Router, Tailwind)
├── backend/
│   └── convex/        # Convex schema, queries, mutations
├── docs/              # Team guides and checklists
├── .github/           # PR templates, CI, branch setup notes
└── convex.json        # Convex CLI config (functions → backend/convex)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend + Convex dev servers |
| `npm run dev:frontend` | TanStack Start on port 3000 |
| `npm run dev:backend` | Convex dev (syncs functions) |
| `npm run build` | Build frontend for production |
| `npm run lint` | ESLint |
| `npm run test` | Vitest |
| `npm run format` | Prettier + ESLint fix |

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
| Greptile | [docs](https://www.greptile.com/docs/introduction) | AI PR review on every pull request |
| Convex | [docs](https://docs.convex.dev/home) | Backend, database, real-time queries |
| TanStack | [tanstack.com](https://tanstack.com/) | Router, Start, Query, and the rest of the stack |
| opensrc | [GitHub](https://github.com/vercel-labs/opensrc) | Fetch npm package source for AI agents |
| code-structure | [GitHub](https://github.com/michaelshimeles/skills) | Service-layer architecture patterns |

### opensrc (optional, for AI coding)

Give coding agents deeper context on npm packages:

```bash
npm install -g opensrc
rg "parse" $(opensrc path zod)
```

See [opensrc README](https://github.com/vercel-labs/opensrc).

## Team onboarding

1. Read [docs/git-workflow-beginner.md](docs/git-workflow-beginner.md) (includes a visual flow diagram).
2. Follow [docs/checklists/pr-checklist.md](docs/checklists/pr-checklist.md) before every PR.
3. See [CONTRIBUTING.md](CONTRIBUTING.md) for branch rules and conventions.
4. Review [docs/starter-decisions.md](docs/starter-decisions.md) for stack choices.

## GitHub setup (repo admin)

After pushing to GitHub, configure branch protection — see [.github/BRANCH_SETUP.md](.github/BRANCH_SETUP.md).
