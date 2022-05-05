import {
  IReadUsersRequestParams,
  TReadUsersResponse
} from '@common/types/users/readUsers.types'

import { RequestHandler } from 'express'

type TExecute = (
  id?: IReadUsersRequestParams['id']
) => Promise<TReadUsersResponse>

type THandle = RequestHandler<IReadUsersRequestParams, TReadUsersResponse>

export type { TExecute, THandle }
