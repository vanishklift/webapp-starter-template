Run the Qodo-loop workflow: iteratively fix a PR until Qodo reports no active Action required findings, Review recommended items are fixed or deferred, and required CI checks pass.

Follow the canonical playbook in `.cursor/skills/qodo-loop/SKILL.md` exactly.

Prerequisites: `gh` CLI installed and authenticated. Work on the PR branch. Qodo must be connected to the repo.

If no PR number was given, detect the PR for the current branch with `gh pr view`.

Trigger reviews with `/agentic_review` (not legacy `/review` or Greptile commands).

Report final iterations, remaining findings by bucket, CI status, and any oscillation stops.
