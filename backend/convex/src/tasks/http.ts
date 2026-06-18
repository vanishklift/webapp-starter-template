import { api } from '../../_generated/api'
import type { ActionCtx } from '../../_generated/server'
import type { Id } from '../../_generated/dataModel'
import { ErrorCodes, logAndReturnError } from '../_shared/errorCodes'
import {
  runMutationWithErrorMapping,
  runMutationWithMessage,
} from '../_shared/routeHelpers'
import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from '../_shared/http'
import type { HonoWithConvex } from 'convex-helpers/server/hono'
import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { z } from 'zod'

const app: HonoWithConvex<ActionCtx> = new Hono()

const TaskSchema = z.object({
  _id: z.string(),
  text: z.string(),
  isCompleted: z.boolean(),
  _creationTime: z.number(),
})

/**
 * GET /tasks - Get all tasks.
 */
app.get(
  '/tasks',
  describeRoute({
    tags: ['Tasks'],
    description: 'Retrieves all tasks from the database.',
    responses: {
      200: {
        description: 'Successfully retrieved all tasks.',
        content: {
          'application/json': {
            schema: resolver(
              SuccessResponseSchema.extend({
                data: z.array(TaskSchema),
              }),
            ),
          },
        },
      },
      500: {
        description: 'Internal server error.',
        content: {
          'application/json': {
            schema: resolver(ErrorResponseSchema),
          },
        },
      },
    },
  }),
  async (c) => {
    try {
      const tasks = await c.env.runQuery(api.src.tasks.queries.list, {})
      return c.json({ success: true, data: tasks })
    } catch {
      const errorData = await logAndReturnError(
        { env: c.env },
        ErrorCodes.INTERNAL_ERROR,
        'Failed to retrieve tasks.',
      )
      return c.json(errorData, errorData.status)
    }
  },
)

/**
 * GET /tasks/:id - Get a task by ID.
 */
app.get(
  '/tasks/:id',
  describeRoute({
    tags: ['Tasks'],
    description: 'Retrieves a specific task by its ID.',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the task to retrieve.',
        schema: { type: 'string' },
      },
    ],
    responses: {
      200: {
        description: 'Successfully retrieved task.',
        content: {
          'application/json': {
            schema: resolver(
              SuccessResponseSchema.extend({
                data: TaskSchema,
              }),
            ),
          },
        },
      },
      404: {
        description: 'Task not found.',
        content: {
          'application/json': {
            schema: resolver(ErrorResponseSchema),
          },
        },
      },
      500: {
        description: 'Internal server error.',
        content: {
          'application/json': {
            schema: resolver(ErrorResponseSchema),
          },
        },
      },
    },
  }),
  async (c) => {
    const id = c.req.param('id') as Id<'tasks'>

    try {
      const task = await c.env.runQuery(api.src.tasks.queries.getById, { id })

      if (!task) {
        return c.json(
          { ...ErrorCodes.NOT_FOUND, message: 'Task not found.' },
          404,
        )
      }

      return c.json({ success: true, data: task })
    } catch {
      const errorData = await logAndReturnError(
        { env: c.env },
        ErrorCodes.INTERNAL_ERROR,
        'Failed to retrieve task.',
      )
      return c.json(errorData, errorData.status)
    }
  },
)

/**
 * POST /tasks - Create a new task.
 */
app.post(
  '/tasks',
  describeRoute({
    tags: ['Tasks'],
    description: 'Creates a new task with the specified text.',
    responses: {
      201: {
        description: 'Successfully created task.',
        content: {
          'application/json': {
            schema: resolver(
              SuccessResponseSchema.extend({
                data: z.object({ id: z.string() }),
              }),
            ),
          },
        },
      },
      500: {
        description: 'Internal server error.',
        content: {
          'application/json': {
            schema: resolver(ErrorResponseSchema),
          },
        },
      },
    },
  }),
  validator(
    'json',
    z.object({
      text: z.string().min(1, 'Text is required.'),
      isCompleted: z.boolean().optional(),
    }),
  ),
  async (c) => {
    const { text, isCompleted } = c.req.valid('json')

    try {
      const taskId = await c.env.runMutation(api.src.tasks.mutations.create, {
        text,
        isCompleted,
      })

      return c.json({ success: true, data: { id: taskId } }, 201)
    } catch {
      const errorData = await logAndReturnError(
        { env: c.env },
        ErrorCodes.INTERNAL_ERROR,
        'Failed to create task.',
      )
      return c.json(errorData, errorData.status)
    }
  },
)

/**
 * POST /tasks/:id/toggle - Toggle task completion.
 */
app.post(
  '/tasks/:id/toggle',
  describeRoute({
    tags: ['Tasks'],
    description: 'Toggles the completion status of a task.',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the task to toggle.',
        schema: { type: 'string' },
      },
    ],
    responses: {
      200: {
        description: 'Successfully toggled task.',
        content: {
          'application/json': {
            schema: resolver(
              SuccessResponseSchema.extend({
                data: TaskSchema,
              }),
            ),
          },
        },
      },
      404: {
        description: 'Task not found.',
        content: {
          'application/json': {
            schema: resolver(ErrorResponseSchema),
          },
        },
      },
      500: {
        description: 'Internal server error.',
        content: {
          'application/json': {
            schema: resolver(ErrorResponseSchema),
          },
        },
      },
    },
  }),
  async (c) => {
    const id = c.req.param('id') as Id<'tasks'>

    return runMutationWithErrorMapping(
      { json: c.json.bind(c), env: c.env },
      () => c.env.runMutation(api.src.tasks.mutations.toggle, { id }),
      'Failed to toggle task.',
    )
  },
)

/**
 * DELETE /tasks/:id - Delete a task.
 */
app.delete(
  '/tasks/:id',
  describeRoute({
    tags: ['Tasks'],
    description: 'Deletes a task by its ID.',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'The ID of the task to delete.',
        schema: { type: 'string' },
      },
    ],
    responses: {
      200: {
        description: 'Successfully deleted task.',
        content: {
          'application/json': {
            schema: resolver(SuccessResponseSchema),
          },
        },
      },
      404: {
        description: 'Task not found.',
        content: {
          'application/json': {
            schema: resolver(ErrorResponseSchema),
          },
        },
      },
      500: {
        description: 'Internal server error.',
        content: {
          'application/json': {
            schema: resolver(ErrorResponseSchema),
          },
        },
      },
    },
  }),
  async (c) => {
    const id = c.req.param('id') as Id<'tasks'>

    return runMutationWithMessage(
      { json: c.json.bind(c), env: c.env },
      () => c.env.runMutation(api.src.tasks.mutations.remove, { id }),
      'Task deleted successfully.',
      'Failed to delete task.',
    )
  },
)

export default app
