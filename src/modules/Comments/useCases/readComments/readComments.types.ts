import { RequestHandler } from 'express'

import {
  IReadCommentsRequest,
  TReadCommentsResponse
} from '@common/types/comments/useCases/readComments.types'

type TExecute = (req: IReadCommentsRequest) => Promise<TReadCommentsResponse>

type THandle = RequestHandler<
  void,
  TReadCommentsResponse,
  void,
  IReadCommentsRequest
>

export type { TExecute, THandle }
