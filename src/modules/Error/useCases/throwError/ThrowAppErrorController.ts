import { ThrowAppErrorService } from './ThrowAppErrorService'
import { THandle } from './ThrowAppError.types'

class ThrowAppErrorController {
  handle: THandle = (error, _req, res, _next) => {
    const throwAppErrorService = new ThrowAppErrorService()

    const response = throwAppErrorService.execute(error)

    return res.status(response.statusCode).json({ error: response.error })
  }
}

export { ThrowAppErrorController }
