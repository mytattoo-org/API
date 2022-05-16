import supertest from 'supertest'

import type { IThrowAppErrorResponse } from '@common/types/errors/ThrowAppError.types'

interface ISuperResponse<Response> extends supertest.Response {
  body: Response & IThrowAppErrorResponse
}

export { ISuperResponse }