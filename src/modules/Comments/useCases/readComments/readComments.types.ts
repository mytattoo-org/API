import { RequestHandler } from 'express'

import {
  IReadCommentsRequestParams,
  TReadCommentsResponse
} from '@common/types/comments/useCases/readComments.types'

type TExecute = (
  req: IReadCommentsRequestParams
) => Promise<TReadCommentsResponse>

type THandle = RequestHandler<
  void,
  TReadCommentsResponse,
  IReadCommentsRequestParams
>

export type { TExecute, THandle }
