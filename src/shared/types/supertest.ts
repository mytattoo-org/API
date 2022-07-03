import { Response as SuperTestResponse } from 'supertest'

import type { IThrowAppErrorResponse } from '@common/types/errors/useCases/ThrowAppError.types'

interface ISuperResponse<Response> extends SuperTestResponse {
  body: Response & IThrowAppErrorResponse
}

export type { ISuperResponse }
