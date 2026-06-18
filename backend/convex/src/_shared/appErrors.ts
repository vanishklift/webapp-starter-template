import type { ErrorCode } from './errorCodes'
import type { HttpStatusCode } from './http'

export type AppErrorPayload = {
  code: string
  message: string
  status: number
}

export class AppError extends Error {
  readonly payload: AppErrorPayload

  constructor(payload: AppErrorPayload) {
    super(payload.message)
    this.name = 'AppError'
    this.payload = payload
  }
}

/**
 * Throws a typed application error for Convex mutations and actions.
 */
export function throwAppError(
  errorCode: ErrorCode,
  customMessage?: string,
): never {
  throw new AppError({
    ...errorCode,
    message: customMessage ?? errorCode.message,
  })
}

/**
 * Extracts a typed app error from Convex failures, including legacy JSON-stringified errors.
 */
export function getAppErrorFromUnknown(error: unknown): AppErrorPayload | null {
  if (error instanceof AppError) {
    return error.payload
  }

  if (error instanceof Error) {
    try {
      const parsed = JSON.parse(error.message) as AppErrorPayload
      if (parsed?.code && parsed?.status) {
        return parsed
      }
    } catch {
      // Not a legacy JSON-stringified app error.
    }
  }

  return null
}

/**
 * Maps a Convex error to an HTTP response body and status, or null if not an app error.
 */
export function mapConvexErrorToHttp(error: unknown): {
  body: AppErrorPayload
  status: HttpStatusCode
} | null {
  const appError = getAppErrorFromUnknown(error)
  if (!appError) {
    return null
  }

  return {
    body: appError,
    status: appError.status as HttpStatusCode,
  }
}
