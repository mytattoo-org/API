import { ErrorRequestHandler } from 'express'

import { AppError } from '@modules/Error/entities/AppError'

import type { IThrowAppErrorResponse } from '@common/types/errors/ThrowAppError.types'

type THandle = ErrorRequestHandler<any, IThrowAppErrorResponse>

type TExecute = (error: Error | AppError) => {
  statusCode: number
  error: IThrowAppErrorResponse['error']
}

export type { THandle, TExecute }
