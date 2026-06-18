Run the Greploop workflow: iteratively fix a PR until Greptile gives 5/5 confidence with zero unresolved comments.

Follow the canonical playbook in `.cursor/skills/greploop/SKILL.md` exactly.

Prerequisites: `gh` CLI installed and authenticated. Work on the PR branch.

If no PR number was given, detect the PR for the current branch with `gh pr view`.

Report final iterations, confidence score, comments resolved, and any remaining items.
