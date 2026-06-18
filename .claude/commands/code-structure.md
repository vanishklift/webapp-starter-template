Refactor duplicated operational logic into a shared service layer.

Follow the canonical playbook in `.cursor/skills/code-structure/SKILL.md` exactly.

In this repo:
- Orchestration: Convex mutations/queries, route handlers
- Service layer: shared helpers in `backend/convex/src/_shared/` or feature-local shared modules; frontend utilities in `frontend/src/lib/`

Do not move domain rules (auth, policy, state transitions) into the service layer.
