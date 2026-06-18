import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import test from 'node:test'

import {
  BRIEF_RELATIVE_PATH,
  TEMPLATE_RELATIVE_PATH,
  buildIntakeUpdate,
  buildProjectBrief,
  fillTemplate,
  normalizeAnswer,
  toBulletList,
} from './project-brief.mjs'

const sampleAnswers = {
  projectName: 'Team Tasks',
  pitch: 'A shared task board for small teams.',
  targetUsers: 'Small product teams',
  problem: 'Tasks get lost across chat and spreadsheets.',
  primaryWorkflow: 'Create a task, assign it, and mark it done.',
  coreEntities: 'tasks, projects, members',
  mustHaveFeatures: 'task list, assignments, due dates',
  authRoles: 'Email login; admin and member roles',
  integrations: 'Slack notifications',
  dataSensitivity: 'Internal team data only',
  productTone: 'Clean, calm, professional',
  successCriteria: 'A team can manage a sprint without spreadsheets',
}

test('normalizeAnswer trims and falls back for empty values', () => {
  assert.equal(normalizeAnswer('  hello  '), 'hello')
  assert.equal(normalizeAnswer(''), '_Not specified yet._')
  assert.equal(normalizeAnswer(undefined, 'fallback'), 'fallback')
})

test('toBulletList splits comma and newline separated values', () => {
  assert.equal(
    toBulletList('tasks, projects, members'),
    '- tasks\n- projects\n- members',
  )
  assert.equal(
    toBulletList('tasks\nprojects'),
    '- tasks\n- projects',
  )
  assert.equal(toBulletList(''), '_Not specified yet._')
})

test('fillTemplate replaces known placeholders', () => {
  const result = fillTemplate('Hello {{NAME}} from {{PLACE}}', {
    NAME: 'World',
    PLACE: 'Earth',
  })

  assert.equal(result, 'Hello World from Earth')
  assert.match(result, /World/)
})

test('buildProjectBrief renders expected sections from template', () => {
  const repoRoot = mkdtempSync(join(tmpdir(), 'workbench-brief-'))

  mkdirSync(join(repoRoot, 'docs', 'templates'), { recursive: true })
  writeFileSync(
    join(repoRoot, TEMPLATE_RELATIVE_PATH),
    `# {{PROJECT_NAME}}

Pitch: {{PITCH}}
Users: {{TARGET_USERS}}
Workflow: {{PRIMARY_WORKFLOW}}
Entities:
{{CORE_ENTITIES}}
Features:
{{PLANNED_FEATURES}}
Updated: {{LAST_UPDATED}}
`,
    'utf8',
  )

  const brief = buildProjectBrief(sampleAnswers, {
    repoRoot,
    date: '2026-06-18',
  })

  assert.match(brief, /# Team Tasks/)
  assert.match(brief, /Pitch: A shared task board for small teams\./)
  assert.match(brief, /Users: Small product teams/)
  assert.match(brief, /- tasks/)
  assert.match(brief, /- assignments/)
  assert.match(brief, /Updated: 2026-06-18/)
})

test('buildIntakeUpdate creates dated appendix with optional sections', () => {
  const update = buildIntakeUpdate(sampleAnswers, { date: '2026-06-18' })

  assert.match(update, /## Intake Update \(2026-06-18\)/)
  assert.match(update, /### Authentication and roles/)
  assert.match(update, /Email login; admin and member roles/)
  assert.match(update, /### Success criteria/)
})

test('buildProjectBrief uses inline fallback when repoRoot is omitted', () => {
  const brief = buildProjectBrief(sampleAnswers, { date: '2026-06-18' })

  assert.match(brief, /# Team Tasks/)
  assert.match(brief, /## Project Snapshot/)
  assert.match(brief, /## Agent Notes/)
})

test('brief path constant matches documented location', () => {
  assert.equal(BRIEF_RELATIVE_PATH, 'docs/project-brief.md')
})
