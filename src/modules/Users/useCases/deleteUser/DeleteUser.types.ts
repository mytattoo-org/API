import {
  IDeleteUserRequestParams,
  TDeleteUserResponse
} from '@common/types/users/deleteUser.types'

import { RequestHandler } from 'express'

type THandle = RequestHandler<IDeleteUserRequestParams, TDeleteUserResponse>

type TExecute = (id: string) => Promise<TDeleteUserResponse>

export { TExecute, THandle }
