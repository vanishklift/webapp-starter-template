import { mutation } from '../../_generated/server'
import { throwAppError } from '../_shared/appErrors'
import { ErrorCodes } from '../_shared/errorCodes'
import { v } from 'convex/values'

/**
 * Creates a new task.
 */
export const create = mutation({
  args: {
    text: v.string(),
    isCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('tasks', {
      text: args.text,
      isCompleted: args.isCompleted ?? false,
    })
  },
})

/**
 * Toggles a task's completion status.
 */
export const toggle = mutation({
  args: {
    id: v.id('tasks'),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id)
    if (!task) {
      throwAppError(ErrorCodes.NOT_FOUND, 'Task not found.')
    }

    await ctx.db.patch(args.id, {
      isCompleted: !task.isCompleted,
    })

    return await ctx.db.get(args.id)
  },
})

/**
 * Deletes a task by ID.
 */
export const remove = mutation({
  args: {
    id: v.id('tasks'),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id)
    if (!task) {
      throwAppError(ErrorCodes.NOT_FOUND, 'Task not found.')
    }

    await ctx.db.delete(args.id)
    return args.id
  },
})
