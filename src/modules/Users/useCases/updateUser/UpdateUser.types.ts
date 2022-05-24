import { RequestHandler } from 'express'

import {
  IUpdateUserRequest,
  IUpdateUserRequestParams,
  TUpdateUserResponse
} from '@common/types/users/updateUser.types'
import { IUserModel } from '@common/types/users/userModel.types'

interface IExecuteParams extends IUpdateUserRequest {
  id: IUserModel['id']
}

type TExecute = (data: IExecuteParams) => Promise<TUpdateUserResponse>

type THandle = RequestHandler<
  IUpdateUserRequestParams,
  TUpdateUserResponse,
  IUpdateUserRequest
>

export type { TExecute, THandle }
