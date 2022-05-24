import { RequestHandler } from 'express'

import { IUserModel } from '@common/types/users/models/userModel.types'
import {
  IUpdateUserRequest,
  IUpdateUserRequestParams,
  TUpdateUserResponse
} from '@common/types/users/useCases/updateUser.types'

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
