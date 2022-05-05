import type {
  ICreateUserRequest,
  TCreateUserResponse
} from '@common/types/users/createUser.types'
import { RequestHandler } from 'express'

type THandle = RequestHandler<void, TCreateUserResponse, ICreateUserRequest>

type TExecute = (data: ICreateUserRequest) => Promise<TCreateUserResponse>

export type { THandle, TExecute }
