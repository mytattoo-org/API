import { RequestHandler } from 'express'

import {
  IReadUsersRequestParams,
  TReadUsersResponse
} from '@common/types/users/useCases/readUsers.types'

type TExecute = (
  id?: IReadUsersRequestParams['id']
) => Promise<TReadUsersResponse>

type THandle = RequestHandler<IReadUsersRequestParams, TReadUsersResponse>

export type { TExecute, THandle }
