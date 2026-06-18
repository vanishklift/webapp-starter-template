---
name: frontend-component-architecture
description: Guides frontend component placement, shadcn/ui composition, app primitives, feature components, and route-level auth. Use when adding React components, AppProvider, protected pages, shadcn usage, feature UI, or refactoring duplicated component markup.
---

# Frontend Component Architecture

## Overview

Workbench uses a layered component model: shadcn primitives → app primitives → feature components → routes → Convex backend. Each layer composes the one below it and owns a specific kind of responsibility.

## When to Use

- Adding a new UI component and unsure where it belongs
- Creating app-wide wrappers (`AppProvider`, `PageShell`, `CardBackground`)
- Building feature-specific UI (`UserCard`, `TaskList`)
- Adding protected/public page behavior
- Installing or composing shadcn/ui components
- Refactoring duplicated markup across routes or features

## Layer Map

| Layer | Path | Owns | Example |
|-------|------|------|---------|
| shadcn primitives | `frontend/src/components/ui/` | Generic presentational building blocks | `Button`, `Card`, `Input` |
| App primitives | `frontend/src/components/app/` | App-wide reusable shells and providers | `AppProvider`, `CardBackground`, `PageShell` |
| Feature components | `frontend/src/features/<feature>/components/` | Domain-specific UI composed from lower layers | `UserCard`, `TaskList` |
| Feature hooks | `frontend/src/features/<feature>/hooks/` | Feature query wiring and UI state | `useTasks`, `useUserProfile` |
| Routes | `frontend/src/routes/` | Page assembly, loaders, auth gating | `index.tsx`, `__root.tsx` |
| Shared utils | `frontend/src/lib/` | Cross-feature helpers | `cn()` in `utils.ts` |
| Backend | `backend/convex/src/<feature>/` | Business logic, validation, data | `queries.ts`, `mutations.ts` |

## Decision Tree

```
New UI needed?
├── Generic button/input/card styling? → shadcn ui (components/ui/)
├── Reused across 2+ features as a shell/wrapper? → app primitive (components/app/)
├── Specific to one feature/domain? → feature component (features/<feature>/components/)
├── Page-level layout or auth? → route or AppProvider
└── Data/business rule? → Convex backend, wire in route/hook
```

## shadcn/ui Usage

Config lives in `frontend/components.json` (style: `new-york`, icons: `lucide`, css: `src/styles.css`).

### Adding primitives

Run from `frontend/`:

```bash
npx shadcn@latest add button card input badge separator
```

Components land in `frontend/src/components/ui/` with lowercase filenames. Import via `@/components/ui/<name>`.

### Customizing without breaking upgrades

- **Prefer wrapping** over editing generated files. Create app primitives that compose shadcn components.
- **Minimal edits** to ui/ files when necessary (e.g. project-specific variant). Document why in the PR.
- **Use `cn()`** from `@/lib/utils` for class merging — same pattern as shadcn defaults.
- **Use CSS variables** from `src/styles.css` for theming; avoid hardcoded colors in components.

### Aliases (from components.json)

| Alias | Path |
|-------|------|
| `@/components/ui` | shadcn primitives |
| `@/components` | all components |
| `@/lib` | shared utilities |
| `@/hooks` | shared hooks |

## Composition Examples

### App primitive: CardBackground

Lives in `frontend/src/components/app/card-background.tsx`. Wraps shadcn `Card` with app-wide styling (border, padding, hover). No feature-specific content or data fetching.

```tsx
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function CardBackground({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Card className={cn('transition-shadow hover:shadow-md', className)}>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
```

### Feature component: UserCard

Lives in `frontend/src/features/users/components/user-card.tsx`. Composes `CardBackground` + shadcn `Badge` + feature data passed as props.

```tsx
import { CardBackground } from '@/components/app/card-background'
import { Badge } from '@/components/ui/badge'

type UserCardProps = {
  name: string
  role: string
}

export function UserCard({ name, role }: UserCardProps) {
  return (
    <CardBackground>
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
        <Badge variant="secondary">{role}</Badge>
      </div>
    </CardBackground>
  )
}
```

### Route: page assembly

Routes in `frontend/src/routes/` fetch data (via Convex + TanStack Query), decide auth, and compose feature components. See `frontend/src/routes/index.tsx` for the current pattern.

## AppProvider and Protected Pages

- **`AppProvider`** (`components/app/app-provider.tsx`): wraps global providers (Convex, QueryClient, theme). Single mount point in `__root.tsx` or router setup.
- **Protected vs public**: decide at route level via route metadata, layout guards, or provider policy — not inside feature cards.
- **Auth checks**: route `beforeLoad` or layout wrapper redirects unauthenticated users. Feature components receive already-authorized data as props.
- **Do not** scatter `isProtected` props on arbitrary components. If a page needs protection, the route declares it.

## Logic Boundaries

| Concern | Where |
|---------|-------|
| Convex queries/mutations | `backend/convex/src/<feature>/` |
| Subscribing to data in UI | Route or `features/<feature>/hooks/` |
| Presentational rendering | Feature components |
| Generic styling/structure | App primitives or shadcn ui |
| Cross-feature utilities | `frontend/src/lib/` |

Aligns with the `code-structure` skill: routes orchestrate, services/hooks handle reusable mechanics, Convex owns domain rules.

## Refactor Checklist

When cleaning up duplicated UI:

- [ ] Identify repeated markup across 2+ call sites
- [ ] Check if an existing app primitive or shadcn component already covers it
- [ ] Extract to `components/app/` only if reused across features; keep in feature folder if single-feature
- [ ] Move data fetching out of extracted component into route or hook
- [ ] Verify no business logic leaked into `components/ui/` or `components/app/`
- [ ] Use PascalCase for new app/feature files; keep shadcn ui filenames lowercase

## Anti-Patterns

- Putting Convex calls inside `components/ui/` or generic app primitives
- Copy-pasting Card/Button markup instead of composing `CardBackground`
- Adding `isProtected` to individual feature components
- Heavily modifying shadcn generated files for one-off styling (wrap instead)
- Creating `components/app/` entries used by only one feature (keep in `features/`)

## Related

- Architecture overview: `docs/starter-architecture.md`
- Backend feature folders: `backend/convex/src/<feature>/`
- Service layer patterns: `.cursor/skills/code-structure/SKILL.md`
- shadcn config: `frontend/components.json`
