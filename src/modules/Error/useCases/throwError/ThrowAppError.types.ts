import { ErrorRequestHandler } from 'express'

import { AppError } from '@modules/Error/models/AppError'

import type { IThrowAppErrorResponse } from '@common/types/errors/useCases/ThrowAppError.types'

type THandle = ErrorRequestHandler<any, IThrowAppErrorResponse>

type TExecute = (error: Error | AppError) => {
  statusCode: number
  error: IThrowAppErrorResponse['error']
}

export type { THandle, TExecute }
