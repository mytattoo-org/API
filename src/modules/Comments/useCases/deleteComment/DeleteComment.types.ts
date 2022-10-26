import { RequestHandler } from 'express'

import {
  IDeleteCommentRequestParams,
  TDeleteCommentResponse
} from '@common/types/comments/useCases/deleteComment.types'

type TExecute = (
  id: IDeleteCommentRequestParams['id']
) => Promise<TDeleteCommentResponse>

type THandle = RequestHandler<
  IDeleteCommentRequestParams,
  TDeleteCommentResponse,
  void
>

export type { TExecute, THandle }
