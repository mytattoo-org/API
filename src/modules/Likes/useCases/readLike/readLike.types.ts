import { RequestHandler } from 'express'

import {
  IReadLikesRequest,
  TReadLikesResponse
} from '@common/types/likes/useCases/readLikes.types'

type TExecute = (req: IReadLikesRequest) => Promise<TReadLikesResponse>

type THandle = RequestHandler<void, TReadLikesResponse, IReadLikesRequest>

export type { TExecute, THandle }
