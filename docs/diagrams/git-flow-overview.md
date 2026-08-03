# Git flow — branch timeline

A second view of how branches move over time.

```mermaid
gitGraph
  commit id: "init"
  branch staging
  checkout staging
  commit id: "team-ready"
  branch feat/login
  checkout feat/login
  commit id: "login-ui"
  commit id: "login-api"
  checkout staging
  merge feat/login id: "PR merged"
  branch feat/tasks
  checkout feat/tasks
  commit id: "task-list"
  checkout staging
  merge feat/tasks id: "PR merged 2"
  checkout main
  merge staging id: "release to main" tag: "v0.1.0"
  checkout staging
  commit id: "next sprint"
```

## Legend

| Symbol | Meaning |
|--------|---------|
| `feat/*` branch | One person's task; deleted after merge |
| Merge into `staging` | Normal daily integration |
| Merge `staging` → `main` | Release to production |

## Who does what

| Person | Typical action |
|--------|----------------|
| Developer | `feat/*` → PR → `staging` |
| Reviewer | Approve PR, check Qodo + CI |
| Release owner | `staging` → PR → `main` |

Full commands: [git-workflow-beginner.md](../git-workflow-beginner.md)
