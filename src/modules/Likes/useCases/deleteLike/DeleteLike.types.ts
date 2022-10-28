import { RequestHandler } from 'express'

import {
  IDeleteLikeRequest,
  TDeleteLikeResponse
} from '@common/types/likes/useCases/deleteLike.types'

type TExecute = (like: IDeleteLikeRequest) => Promise<TDeleteLikeResponse>

type THandle = RequestHandler<void, TDeleteLikeResponse, IDeleteLikeRequest>

export type { TExecute, THandle }
