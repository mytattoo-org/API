import { RequestHandler } from 'express'

import {
  IDeleteUserRequestParams,
  TDeleteUserResponse
} from '@common/types/users/deleteUser.types'

type THandle = RequestHandler<IDeleteUserRequestParams, TDeleteUserResponse>

type TExecute = (id: string) => Promise<TDeleteUserResponse>

export { TExecute, THandle }
