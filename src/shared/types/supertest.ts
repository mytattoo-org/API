import { IThrowAppErrorResponse } from '@modules/Error/useCases/throwError/ThrowAppError.types'

import supertest from 'supertest'

interface ISuperResponse<Response> extends supertest.Response {
  body: Response & IThrowAppErrorResponse
}

export { ISuperResponse }
