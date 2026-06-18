import { query } from '../../_generated/server'
import { v } from 'convex/values'

/**
 * Returns all tasks from the database.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').collect()
  },
})

/**
 * Returns a task by ID, or null if not found.
 */
export const getById = query({
  args: {
    id: v.id('tasks'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})
