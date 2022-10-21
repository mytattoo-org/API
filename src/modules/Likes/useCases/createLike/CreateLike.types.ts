import { RequestHandler } from 'express'

import {
  ICreateLikeRequest,
  TCreateLikeResponse
} from '@common/types/likes/useCases/createLike.types'

type TExecute = (
  dataToCreate: ICreateLikeRequest
) => Promise<TCreateLikeResponse>

type THandle = RequestHandler<void, TCreateLikeResponse, ICreateLikeRequest>

export type { TExecute, THandle }
