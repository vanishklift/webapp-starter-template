/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules, FilterApi, FunctionReference } from 'convex/server'
import type * as tasks from '../tasks.js'
import type * as src_internal_logging_logging from '../src/internal/logging/logging.js'
import type * as src_tasks_mutations from '../src/tasks/mutations.js'
import type * as src_tasks_queries from '../src/tasks/queries.js'

declare const fullApi: ApiFromModules<{
  tasks: typeof tasks
  'src/internal/logging/logging': typeof src_internal_logging_logging
  'src/tasks/mutations': typeof src_tasks_mutations
  'src/tasks/queries': typeof src_tasks_queries
}>

export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, 'public'>
>
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, 'internal'>
>
