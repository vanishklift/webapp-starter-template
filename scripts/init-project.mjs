#!/usr/bin/env node
/**
 * Guided project intake: ask what you want to build and create docs/project-brief.md.
 * Re-run to append a dated intake update when the brief already exists.
 */

import { existsSync } from 'node:fs'
import { appendFile, writeFile } from 'node:fs/promises'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  BRIEF_RELATIVE_PATH,
  INTAKE_QUESTIONS,
  buildIntakeUpdate,
  buildProjectBrief,
} from './project-brief.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const briefPath = join(repoRoot, BRIEF_RELATIVE_PATH)

function printHelp() {
  console.log(`Usage: npm run init-project

Ask guided questions about the app you want to build and write ${BRIEF_RELATIVE_PATH}.
If the brief already exists, you can append a dated intake update instead of overwriting it.

Options:
  --help    Show this help message
`)
}

/**
 * @param {import('node:readline/promises').Interface} rl
 */
async function askYesNo(rl, question, defaultYes = false) {
  const hint = defaultYes ? 'Y/n' : 'y/N'
  const answer = (await rl.question(`${question} (${hint}): `)).trim().toLowerCase()

  if (!answer) {
    return defaultYes
  }

  return answer === 'y' || answer === 'yes'
}

/**
 * @param {import('node:readline/promises').Interface} rl
 */
async function collectAnswers(rl) {
  /** @type {Record<string, string>} */
  const answers = {}

  console.log('\nProject intake — answer a few questions to create your living project brief.\n')
  console.log('Press Enter to accept defaults shown in [brackets].\n')

  for (const question of INTAKE_QUESTIONS) {
    const defaultHint =
      question.defaultValue !== undefined ? ` [${question.defaultValue}]` : ''

    while (true) {
      const raw = await rl.question(`${question.prompt}${defaultHint}: `)
      const value =
        raw.trim().length > 0
          ? raw.trim()
          : question.defaultValue !== undefined
            ? question.defaultValue
            : ''

      if (question.required && !value) {
        console.log('  This field is required. Please provide a value.\n')
        continue
      }

      answers[question.key] = value
      break
    }
  }

  return answers
}

async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    printHelp()
    return
  }

  const briefExists = existsSync(briefPath)
  const rl = createInterface({ input, output })

  try {
    /** @type {'create' | 'append' | 'cancel'} */
    let mode = 'create'

    if (briefExists) {
      console.log(`\n${BRIEF_RELATIVE_PATH} already exists.\n`)
      const append = await askYesNo(
        rl,
        'Append a dated intake update instead of overwriting?',
        true,
      )

      if (append) {
        mode = 'append'
      } else {
        const overwrite = await askYesNo(
          rl,
          'Overwrite the existing brief? This cannot be undone',
          false,
        )

        if (!overwrite) {
          mode = 'cancel'
        }
      }
    }

    if (mode === 'cancel') {
      console.log('\nNo changes made.')
      return
    }

    const answers = await collectAnswers(rl)

    if (mode === 'create') {
      const content = buildProjectBrief(answers, { repoRoot })
      await writeFile(briefPath, content, 'utf8')
      console.log(`\nCreated ${BRIEF_RELATIVE_PATH}`)
    } else {
      const update = buildIntakeUpdate(answers)
      await appendFile(briefPath, `\n\n${update}`, 'utf8')
      console.log(`\nAppended intake update to ${BRIEF_RELATIVE_PATH}`)
    }

    console.log('\nNext steps:')
    console.log('  1. Review and commit the brief so agents and teammates can read it.')
    console.log('  2. Continue with backend/frontend setup from README.md.')
    console.log('  3. Ask agents to update the brief as features and decisions land.\n')
  } finally {
    rl.close()
  }
}

main().catch((error) => {
  console.error('\ninit-project failed:', error.message)
  process.exit(1)
})
