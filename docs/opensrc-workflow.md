# opensrc workflow

Give coding agents and developers deeper context on npm packages and GitHub repos by fetching source code locally.

## Setup

No global install required — use `npx`. The starter ships a tracked manifest at `tools/opensrc-stack.txt` and a sync script that fetches all listed sources into the project-local `opensrc/` cache.

```bash
# One command — reads tools/opensrc-stack.txt and fetches everything
npm run opensrc:sync

# Alias (same command)
npm run opensrc:fetch-stack
```

The sync script sets `OPENSRC_HOME=opensrc` automatically so fetched source stays in-repo and gitignored.

Without `OPENSRC_HOME`, opensrc caches globally at `~/.opensrc/`.

## Manifest

The canonical list of sources lives in [tools/opensrc-stack.txt](../tools/opensrc-stack.txt). One source per line; blank lines and `#` comments are ignored.

**Pinning policy:**

- Prefer package names when the package exists in `package-lock.json` — opensrc resolves the installed version from lockfiles.
- Use `owner/repo@tag` for stable repo references when a release tag is known.
- Use `owner/repo#main` only for reference material where latest examples are desired (e.g. `shadcn-ui/ui`, skill sources).
- Update the manifest intentionally when the starter stack changes.

## Fetch commands

| Target type | Command | Example |
|-------------|---------|---------|
| npm package | `npx opensrc fetch <package>` | `npx opensrc fetch convex` |
| GitHub repo | `npx opensrc fetch <owner>/<repo>` | `npx opensrc fetch get-convex/convex-backend` |
| GitHub repo (pinned) | `npx opensrc fetch <owner>/<repo>@tag` | `npx opensrc fetch honojs/hono@v4.12.26` |
| Python package | `npx opensrc fetch pypi:<package>` | `npx opensrc fetch pypi:requests` |
| Rust crate | `npx opensrc fetch crates:<package>` | `npx opensrc fetch crates:serde` |

## Where files land

Fetched GitHub repos are stored at:

```
opensrc/repos/github.com/<owner>/<repo>/
```

npm package sources land under `opensrc/` following opensrc's default layout.

The entire `opensrc/` directory is **gitignored** — it is a local reference cache. Do not commit fetched upstream source. When you copy patterns or skills into the project, put them in tracked paths (e.g. `.cursor/skills/`, `backend/convex/src/`).

## Stack repos

See [stack-source-repos.md](stack-source-repos.md) for the human-readable inventory and rationale behind each source.

To sync all manifest entries at once:

```bash
npm run opensrc:sync
```

## Using fetched source

Search within fetched source:

```bash
# Find a function in a fetched repo
rg "runQuery" opensrc/repos/github.com/get-convex/convex-helpers/

# Find npm package source path
rg "HttpRouterWithHono" $(npx opensrc path convex-helpers)
```

## For AI agents

When working on backend HTTP routes, Convex functions, or frontend UI:

1. Run `npm run opensrc:sync` if `opensrc/` is empty or stale.
2. Check if the relevant repo is already fetched under `opensrc/`.
3. If not in the manifest, run `npx opensrc fetch <owner>/<repo>` for one-off needs.
4. Use fetched source to validate suggestions against upstream patterns.
5. Never edit files inside `opensrc/` — treat them as read-only reference.

See also [AGENTS.md](../AGENTS.md) for agent-specific instructions.
