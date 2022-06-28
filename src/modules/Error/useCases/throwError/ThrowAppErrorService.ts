import { AppError } from '../../models/AppError'
import { TExecute } from './ThrowAppError.types'

class ThrowAppErrorService {
  execute: TExecute = error => {
    return error instanceof AppError
      ? { error: error.message, statusCode: error.statusCode }
      : { error: 'Internal server error - ' + error.message, statusCode: 500 }
  }
}

export { ThrowAppErrorService }
