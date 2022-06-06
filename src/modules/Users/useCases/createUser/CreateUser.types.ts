import { RequestHandler } from 'express'

import type {
  ICreateUserRequest,
  TCreateUserResponse
} from '@common/types/users/useCases/createUser.types'

type THandle = RequestHandler<void, TCreateUserResponse, ICreateUserRequest>

type TExecute = (data: ICreateUserRequest) => Promise<TCreateUserResponse>

export type { THandle, TExecute }
