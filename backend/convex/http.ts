import tasksRouter from './src/tasks/http'
import { Scalar } from '@scalar/hono-api-reference'
import type { ActionCtx } from './_generated/server'
import type { HonoWithConvex } from 'convex-helpers/server/hono'
import { HttpRouterWithHono } from 'convex-helpers/server/hono'
import { Hono } from 'hono'
import { openAPIRouteHandler } from 'hono-openapi'

const app: HonoWithConvex<ActionCtx> = new Hono()

app.basePath('/api').get(
  '/openapi',
  openAPIRouteHandler(app, {
    documentation: {
      info: {
        title: 'Workbench API',
        version: '1.0.0',
        description: 'Convex HTTP API for Workbench.',
      },
    },
  }),
)

app.basePath('/api').get('/scalar', Scalar({ url: '/api/openapi' }))
app.basePath('/api').route('/', tasksRouter)

export default new HttpRouterWithHono(app)
