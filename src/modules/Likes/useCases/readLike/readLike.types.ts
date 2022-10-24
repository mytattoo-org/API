import { RequestHandler } from 'express'

import {
  IReadLikesRequestParams,
  TReadLikesResponse
} from '@common/types/likes/useCases/readLikes.types'

type TExecute = (req: IReadLikesRequestParams) => Promise<TReadLikesResponse>

type THandle = RequestHandler<void, TReadLikesResponse, IReadLikesRequestParams>

export type { TExecute, THandle }
