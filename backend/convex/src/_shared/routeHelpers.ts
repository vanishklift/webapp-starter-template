import { ErrorCodes, logAndReturnError } from './errorCodes'
import { mapConvexErrorToHttp } from './appErrors'
import type { HttpStatusCode } from './http'

type RouteContext = {
  json: (object: unknown, status?: HttpStatusCode) => Response
  env?: {
    scheduler?: {
      runAfter: (...args: any[]) => Promise<any>
    }
  }
}

/**
 * Runs a Convex mutation and maps typed app errors to HTTP responses.
 */
export async function runMutationWithErrorMapping<T>(
  c: RouteContext,
  mutation: () => Promise<T>,
  internalMessage: string,
) {
  try {
    const data = await mutation()
    return c.json({ success: true, data })
  } catch (error) {
    const mapped = mapConvexErrorToHttp(error)
    if (mapped) {
      return c.json(mapped.body, mapped.status)
    }

    const errorData = await logAndReturnError(
      c,
      ErrorCodes.INTERNAL_ERROR,
      internalMessage,
    )
    return c.json(errorData, errorData.status)
  }
}

/**
 * Runs a Convex mutation that returns no data payload on success.
 */
export async function runMutationWithMessage(
  c: RouteContext,
  mutation: () => Promise<unknown>,
  successMessage: string,
  internalMessage: string,
) {
  try {
    await mutation()
    return c.json({
      success: true,
      message: successMessage,
    })
  } catch (error) {
    const mapped = mapConvexErrorToHttp(error)
    if (mapped) {
      return c.json(mapped.body, mapped.status)
    }

    const errorData = await logAndReturnError(
      c,
      ErrorCodes.INTERNAL_ERROR,
      internalMessage,
    )
    return c.json(errorData, errorData.status)
  }
}
