import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const BRIEF_RELATIVE_PATH = 'docs/project-brief.md'
export const TEMPLATE_RELATIVE_PATH = 'docs/templates/project-brief.md'

/** @typedef {Record<string, string>} ProjectAnswers */

/**
 * @param {string | undefined | null} value
 * @param {string} [fallback]
 */
export function normalizeAnswer(value, fallback = '_Not specified yet._') {
  const trimmed = value?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : fallback
}

/**
 * Split comma- or newline-separated input into bullet list items.
 * @param {string | undefined | null} value
 * @param {string} [fallback]
 */
export function toBulletList(value, fallback = '_Not specified yet._') {
  const normalized = value?.trim()
  if (!normalized) {
    return fallback
  }

  const items = normalized
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)

  if (items.length === 0) {
    return fallback
  }

  return items.map((item) => `- ${item}`).join('\n')
}

/**
 * @param {string} template
 * @param {Record<string, string>} values
 */
export function fillTemplate(template, values) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => {
    return Object.hasOwn(values, key) ? values[key] : match
  })
}

/**
 * @param {string} repoRoot
 */
export function loadBriefTemplate(repoRoot) {
  const templatePath = join(repoRoot, TEMPLATE_RELATIVE_PATH)
  return readFileSync(templatePath, 'utf8')
}

/**
 * @param {ProjectAnswers} answers
 * @param {{ date?: string, repoRoot?: string }} [options]
 */
export function buildProjectBrief(answers, options = {}) {
  const date =
    options.date ??
    new Date().toISOString().slice(0, 10)

  const values = {
    PROJECT_NAME: normalizeAnswer(answers.projectName, 'Untitled Project'),
    PITCH: normalizeAnswer(answers.pitch),
    TARGET_USERS: normalizeAnswer(answers.targetUsers),
    PROBLEM: normalizeAnswer(answers.problem),
    PRIMARY_WORKFLOW: normalizeAnswer(answers.primaryWorkflow),
    CORE_ENTITIES: toBulletList(answers.coreEntities),
    V1_OUTCOMES: toBulletList(answers.mustHaveFeatures),
    PLANNED_FEATURES: toBulletList(answers.mustHaveFeatures),
    SUCCESS_CRITERIA: normalizeAnswer(answers.successCriteria),
    AUTH_ROLES: formatConstraint(answers.authRoles),
    INTEGRATIONS: formatConstraint(answers.integrations),
    DATA_SENSITIVITY: formatConstraint(answers.dataSensitivity),
    PRODUCT_TONE: normalizeAnswer(answers.productTone),
    OPEN_QUESTIONS: buildOpenQuestions(answers),
    LAST_UPDATED: date,
  }

  if (options.repoRoot) {
    return fillTemplate(loadBriefTemplate(options.repoRoot), values)
  }

  return fillTemplate(defaultInlineTemplate(), values)
}

/**
 * @param {string | undefined | null} value
 */
function formatConstraint(value) {
  const normalized = value?.trim()
  if (!normalized || normalized.toLowerCase() === 'none') {
    return '_None specified yet._'
  }
  return normalized
}

/**
 * @param {ProjectAnswers} answers
 */
function buildOpenQuestions(answers) {
  const questions = []

  const auth = answers.authRoles?.trim()
  if (!auth || auth.toLowerCase() === 'none') {
    questions.push('- Final authentication and role model (if needed later)')
  }

  const integrations = answers.integrations?.trim()
  if (!integrations || integrations.toLowerCase() === 'none') {
    questions.push('- External integrations and third-party services')
  }

  const sensitivity = answers.dataSensitivity?.trim()
  if (!sensitivity || sensitivity.toLowerCase() === 'none') {
    questions.push('- Data retention, privacy, and compliance requirements')
  }

  if (questions.length === 0) {
    return '_No open questions recorded yet._'
  }

  return questions.join('\n')
}

/**
 * @param {ProjectAnswers} answers
 * @param {{ date?: string }} [options]
 */
export function buildIntakeUpdate(answers, options = {}) {
  const date =
    options.date ??
    new Date().toISOString().slice(0, 10)

  const sections = [
    `## Intake Update (${date})`,
    '',
    'Captured via `npm run init-project` (append mode).',
    '',
    '### Snapshot refresh',
    '',
    `- **Pitch:** ${normalizeAnswer(answers.pitch)}`,
    `- **Target users:** ${normalizeAnswer(answers.targetUsers)}`,
    `- **Problem:** ${normalizeAnswer(answers.problem)}`,
    '',
    '### Primary workflow',
    '',
    normalizeAnswer(answers.primaryWorkflow),
    '',
    '### Domain model additions',
    '',
    toBulletList(answers.coreEntities),
    '',
    '### Planned features',
    '',
    toBulletList(answers.mustHaveFeatures),
  ]

  const auth = answers.authRoles?.trim()
  if (auth) {
    sections.push('', '### Authentication and roles', '', auth)
  }

  const integrations = answers.integrations?.trim()
  if (integrations) {
    sections.push('', '### Integrations', '', integrations)
  }

  const sensitivity = answers.dataSensitivity?.trim()
  if (sensitivity) {
    sections.push('', '### Data sensitivity', '', sensitivity)
  }

  const tone = answers.productTone?.trim()
  if (tone) {
    sections.push('', '### Product tone and UI style', '', tone)
  }

  const success = answers.successCriteria?.trim()
  if (success) {
    sections.push('', '### Success criteria', '', success)
  }

  sections.push('')
  return sections.join('\n')
}

function defaultInlineTemplate() {
  return `# {{PROJECT_NAME}}

> Living project brief for humans and AI agents. Update this document as the product evolves.

**Last updated:** {{LAST_UPDATED}}

## Project Snapshot

| Field | Value |
|-------|-------|
| **Name** | {{PROJECT_NAME}} |
| **Pitch** | {{PITCH}} |
| **Target users** | {{TARGET_USERS}} |
| **Problem** | {{PROBLEM}} |

## Product Goals

### Version 1 outcomes

{{V1_OUTCOMES}}

## User Workflows

### Primary workflow

{{PRIMARY_WORKFLOW}}

## Domain Model

{{CORE_ENTITIES}}

## Feature Roadmap

### Planned

{{PLANNED_FEATURES}}

## Architecture Notes

See [starter-architecture.md](../starter-architecture.md).

## Decisions

| Date | Decision | Reason | Impact |
|------|----------|--------|--------|
| {{LAST_UPDATED}} | Initial project brief created | Capture product direction before building | Shared source of truth for agents and contributors |

## Open Questions

{{OPEN_QUESTIONS}}

## Agent Notes

1. Read this brief before planning product or feature work.
2. Update **Domain Model**, **Feature Roadmap**, and **Decisions** as the product evolves.
`
}

export const INTAKE_QUESTIONS = [
  {
    key: 'projectName',
    prompt: 'Project name',
    required: true,
  },
  {
    key: 'pitch',
    prompt: 'One-sentence pitch (what does this app do?)',
    required: true,
  },
  {
    key: 'targetUsers',
    prompt: 'Target users (who is this for?)',
    required: true,
  },
  {
    key: 'problem',
    prompt: 'Main problem being solved',
    required: true,
  },
  {
    key: 'primaryWorkflow',
    prompt: 'Primary workflow (first thing a user should accomplish)',
    required: true,
  },
  {
    key: 'coreEntities',
    prompt: 'Core entities (comma-separated, e.g. tasks, projects, clients)',
    required: true,
  },
  {
    key: 'mustHaveFeatures',
    prompt: 'Must-have v1 features (comma-separated)',
    required: true,
  },
  {
    key: 'authRoles',
    prompt: 'Authentication and roles (or "none")',
    required: false,
    defaultValue: 'none',
  },
  {
    key: 'integrations',
    prompt: 'External integrations (or "none")',
    required: false,
    defaultValue: 'none',
  },
  {
    key: 'dataSensitivity',
    prompt: 'Data sensitivity or compliance concerns (or "none")',
    required: false,
    defaultValue: 'none',
  },
  {
    key: 'productTone',
    prompt: 'Product tone and UI style (optional)',
    required: false,
  },
  {
    key: 'successCriteria',
    prompt: 'Success criteria for the first usable version (optional)',
    required: false,
  },
]
