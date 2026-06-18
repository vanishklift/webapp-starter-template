import { describe, expect, it } from 'vitest'

import { ErrorCodes } from './errorCodes'
import {
  AppError,
  getAppErrorFromUnknown,
  mapConvexErrorToHttp,
  throwAppError,
} from './appErrors'

describe('appErrors', () => {
  it('throwAppError creates an AppError with the expected payload', () => {
    expect(() => throwAppError(ErrorCodes.NOT_FOUND, 'Task not found.')).toThrow(
      AppError,
    )

    try {
      throwAppError(ErrorCodes.NOT_FOUND, 'Task not found.')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).payload).toEqual({
        code: 'NOT_FOUND',
        message: 'Task not found.',
        status: 404,
      })
    }
  })

  it('getAppErrorFromUnknown reads AppError instances', () => {
    const error = new AppError({
      ...ErrorCodes.NOT_FOUND,
      message: 'Task not found.',
    })

    expect(getAppErrorFromUnknown(error)).toEqual({
      code: 'NOT_FOUND',
      message: 'Task not found.',
      status: 404,
    })
  })

  it('getAppErrorFromUnknown reads legacy JSON-stringified errors', () => {
    const legacyError = new Error(
      JSON.stringify({
        ...ErrorCodes.NOT_FOUND,
        message: 'Task not found.',
      }),
    )

    expect(getAppErrorFromUnknown(legacyError)).toEqual({
      code: 'NOT_FOUND',
      message: 'Task not found.',
      status: 404,
    })
  })

  it('mapConvexErrorToHttp returns HTTP status and body for app errors', () => {
    const mapped = mapConvexErrorToHttp(
      new AppError({
        ...ErrorCodes.NOT_FOUND,
        message: 'Task not found.',
      }),
    )

    expect(mapped).toEqual({
      body: {
        code: 'NOT_FOUND',
        message: 'Task not found.',
        status: 404,
      },
      status: 404,
    })
  })

  it('mapConvexErrorToHttp returns null for unknown errors', () => {
    expect(mapConvexErrorToHttp(new Error('boom'))).toBeNull()
  })
})
