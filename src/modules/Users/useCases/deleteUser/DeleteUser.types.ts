import { RequestHandler } from 'express'

import type {
  IDeleteUserRequestParams,
  TDeleteUserResponse
} from '@common/types/users/useCases/deleteUser.types'

type THandle = RequestHandler<IDeleteUserRequestParams, TDeleteUserResponse>

type TExecute = (id: string) => Promise<TDeleteUserResponse>

export { TExecute, THandle }
