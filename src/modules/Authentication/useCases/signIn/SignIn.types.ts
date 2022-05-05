import { RequestHandler } from 'express'

import type {
  ISignInRequest,
  TSignInResponse
} from '@common/types/authentication/signIn.types'

type THandle = RequestHandler<void, TSignInResponse, ISignInRequest>

type TExecute = (data: ISignInRequest) => Promise<TSignInResponse>

export type { THandle, TExecute }
