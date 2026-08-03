import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PRETTIER_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.css',
  '.md',
  '.yml',
  '.yaml',
])

const SKIP_PATH_FRAGMENTS = [
  '/node_modules/',
  '/_generated/',
  '/dist/',
  '/.git/',
  'routeTree.gen.ts',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
]

function readStdin() {
  try {
    return readFileSync(0, 'utf8')
  } catch {
    return ''
  }
}

function resolveFrontendRoot(filePath, workspaceRoots) {
  const normalized = filePath.replaceAll('\\', '/')
  const frontendMarker = '/frontend/'
  const markerIndex = normalized.lastIndexOf(frontendMarker)
  if (markerIndex !== -1) {
    return path.resolve(normalized.slice(0, markerIndex + '/frontend'.length))
  }

  for (const root of workspaceRoots) {
    const candidate = path.join(root, 'frontend')
    if (existsSync(path.join(candidate, 'package.json'))) {
      return candidate
    }
  }

  const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
  )
  return path.join(repoRoot, 'frontend')
}

const raw = readStdin()
if (!raw.trim()) {
  process.exit(0)
}

/** @type {{ file_path?: string, workspace_roots?: string[] }} */
let payload
try {
  payload = JSON.parse(raw)
} catch {
  process.exit(0)
}

const filePath = payload.file_path
if (!filePath || !existsSync(filePath)) {
  process.exit(0)
}

const normalized = filePath.replaceAll('\\', '/')
const extension = path.extname(filePath)
if (!PRETTIER_EXTENSIONS.has(extension)) {
  process.exit(0)
}

if (SKIP_PATH_FRAGMENTS.some((fragment) => normalized.includes(fragment))) {
  process.exit(0)
}

if (!normalized.includes('/frontend/')) {
  process.exit(0)
}

const frontendRoot = resolveFrontendRoot(filePath, payload.workspace_roots ?? [])
const prettierBin = path.join(frontendRoot, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
if (!existsSync(prettierBin)) {
  process.stderr.write(
    `[prettier-after-edit] prettier not installed in ${frontendRoot}\n`,
  )
  process.exit(0)
}

const result = spawnSync(process.execPath, [prettierBin, '--write', '--', filePath], {
  cwd: frontendRoot,
  encoding: 'utf8',
})

if (result.status !== 0) {
  process.stderr.write(
    `[prettier-after-edit] failed for ${filePath}\n${result.stderr || result.stdout || ''}`,
  )
}

process.exit(0)
