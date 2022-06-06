import { ThrowAppErrorService } from './ThrowAppErrorService'

import { AppError } from '@modules/Error/models/AppError'

let throwAppErrorService: ThrowAppErrorService

describe('ThrowAppErrorService', () => {
  beforeEach(() => {
    throwAppErrorService = new ThrowAppErrorService()
  })

  it('should return error message if error is instanceof AppError', () => {
    const errorMessage = 'Its a test error'
    const statusCode = 400

    try {
      throw new AppError(errorMessage, statusCode)
    } catch (error) {
      const response = throwAppErrorService.execute(error)

      expect(response.error).toBe(errorMessage)
      expect(response.statusCode).toBe(statusCode)
    }
  })

  it('should return error message "Internal server error" if error is not instanceof AppError', () => {
    const errorMessage = 'Its a test error'

    try {
      throw new Error(errorMessage)
    } catch (error) {
      const response = throwAppErrorService.execute(error)

      expect(response.error).toBe('Internal server error - ' + errorMessage)
      expect(response.statusCode).toBe(500)
    }
  })
})
