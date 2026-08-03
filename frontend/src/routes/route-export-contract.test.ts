import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const routesDir = dirname(fileURLToPath(import.meta.url))
const testFilePattern = /\.(test|spec)\.(ts|tsx)$/
const allowedRuntimeExports = new Set(['Route'])

function collectRouteFiles(dir: string): string[] {
  const entries = readdirSync(dir)
  const files: string[] = []

  for (const entry of entries) {
    // TanStack Router ignores path segments prefixed with "-".
    if (entry.startsWith('-')) {
      continue
    }

    const absolutePath = join(dir, entry)
    const stats = statSync(absolutePath)

    if (stats.isDirectory()) {
      files.push(...collectRouteFiles(absolutePath))
      continue
    }

    if (!/\.(ts|tsx)$/.test(entry) || testFilePattern.test(entry)) {
      continue
    }

    files.push(absolutePath)
  }

  return files
}

function hasExportModifier(node: ts.Node): boolean {
  return (ts.canHaveModifiers(node) ? (ts.getModifiers(node) ?? []) : []).some(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
  )
}

function collectRuntimeExportNames(
  sourceText: string,
  fileName: string,
): string[] {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    fileName.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  )
  const names: string[] = []

  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement) && !statement.isTypeOnly) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) {
          if (!element.isTypeOnly) {
            names.push(element.name.text)
          }
        }
      }
      continue
    }

    if (!hasExportModifier(statement)) {
      continue
    }

    // Type-only declarations do not block TanStack route code-splitting.
    if (
      ts.isTypeAliasDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isModuleDeclaration(statement)
    ) {
      continue
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) {
          names.push(declaration.name.text)
        }
      }
      continue
    }

    if (
      ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isEnumDeclaration(statement)
    ) {
      if (statement.name) {
        names.push(statement.name.text)
      }
    }
  }

  return names
}

describe('route module export contract', () => {
  it('allows only Route as a runtime export from route modules', () => {
    const routeFiles = collectRouteFiles(routesDir)
    expect(routeFiles.length).toBeGreaterThan(0)

    const violations: string[] = []

    for (const filePath of routeFiles) {
      const sourceText = readFileSync(filePath, 'utf8')
      const runtimeExports = collectRuntimeExportNames(sourceText, filePath)
      const unexpected = runtimeExports.filter(
        (name) => !allowedRuntimeExports.has(name),
      )

      if (unexpected.length > 0) {
        const relativePath = relative(routesDir, filePath).replaceAll('\\', '/')
        violations.push(`${relativePath}: ${unexpected.join(', ')}`)
      }
    }

    expect(violations).toEqual([])
  })
})
