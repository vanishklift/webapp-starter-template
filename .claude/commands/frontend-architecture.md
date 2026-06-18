Decide where a new UI component belongs and how to compose it.

Follow the canonical playbook in `.cursor/skills/frontend-component-architecture/SKILL.md` exactly.

Layer map:
- shadcn primitives → `frontend/src/components/ui/`
- App shells → `frontend/src/components/app/`
- Feature UI → `frontend/src/features/<feature>/components/`
- Data wiring → `frontend/src/features/<feature>/hooks/` or routes
- Business logic → `backend/convex/src/<feature>/`

See also `docs/starter-architecture.md` for the full stack overview.
