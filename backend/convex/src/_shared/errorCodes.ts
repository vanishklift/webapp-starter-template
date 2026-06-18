import type { HttpStatusCode } from './http'

export class ErrorCodes {
  static readonly BAD_REQUEST = {
    code: 'BAD_REQUEST',
    message: 'The request is invalid or malformed.',
    status: 400,
  }

  static readonly UNAUTHORIZED = {
    code: 'UNAUTHORIZED',
    message: 'Authentication is required to access this resource.',
    status: 401,
  }

  static readonly FORBIDDEN = {
    code: 'FORBIDDEN',
    message: 'You do not have permission to access this resource.',
    status: 403,
  }

  static readonly NOT_FOUND = {
    code: 'NOT_FOUND',
    message: 'The requested resource was not found.',
    status: 404,
  }

  static readonly CONFLICT = {
    code: 'CONFLICT',
    message: 'The request conflicts with the current state of the resource.',
    status: 409,
  }

  static readonly VALIDATION_ERROR = {
    code: 'VALIDATION_ERROR',
    message: 'The request data failed validation.',
    status: 422,
  }

  static readonly INTERNAL_ERROR = {
    code: 'INTERNAL_ERROR',
    message: 'An internal server error occurred.',
    status: 500,
  }
}

export type ErrorCode = {
  readonly code: string
  readonly message: string
  readonly status: number
}

/**
 * Logs unexpected errors and returns a consistent error payload.
 */
export async function logAndReturnError(
  ctx: {
    scheduler?: {
      runAfter: (...args: any[]) => Promise<any>
    }
    env?: {
      scheduler?: {
        runAfter: (...args: any[]) => Promise<any>
      }
    }
  },
  errorCode: ErrorCode,
  customMessage?: string,
  details?: Record<string, unknown>,
  context?: {
    userId?: string
    requestId?: string
    endpoint?: string
    method?: string
  },
) {
  const message = customMessage ?? errorCode.message

  const scheduler = ctx.scheduler ?? ctx.env?.scheduler
  if (scheduler) {
    await scheduler.runAfter(0, 'src/internal/logging/logging:sendToPostHog', {
      message,
      code: errorCode.code,
      status: errorCode.status,
      details,
      context,
    })
  }

  return {
    error: message,
    code: errorCode.code,
    status: errorCode.status as HttpStatusCode,
    details,
  }
}
