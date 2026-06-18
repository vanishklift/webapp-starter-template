#!/usr/bin/env node
/**
 * Read tools/opensrc-stack.txt and fetch all listed sources into project-local opensrc/.
 * Sets OPENSRC_HOME=opensrc so the cache stays in-repo and gitignored.
 */

import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const manifestPath = join(repoRoot, 'tools', 'opensrc-stack.txt')
const opensrcHome = join(repoRoot, 'opensrc')

function parseManifest(content) {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
}

const manifest = readFileSync(manifestPath, 'utf8')
const sources = parseManifest(manifest)

if (sources.length === 0) {
  console.error('No sources found in tools/opensrc-stack.txt')
  process.exit(1)
}

console.log(`Fetching ${sources.length} source(s) into ${opensrcHome}...\n`)

const result = spawnSync('npx', ['opensrc', 'fetch', ...sources], {
  cwd: repoRoot,
  env: { ...process.env, OPENSRC_HOME: 'opensrc' },
  stdio: 'inherit',
  shell: true,
})

if (result.status !== 0) {
  console.error('\nopensrc fetch failed.')
  process.exit(result.status ?? 1)
}

console.log(`\nDone. ${sources.length} source(s) synced to opensrc/ (gitignored).`)
