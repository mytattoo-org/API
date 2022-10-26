import { RequestHandler } from 'express'

import {
  IUpdateCommentRequest,
  TUpdateCommentResponse
} from '@common/types/comments/useCases/updateComment.types'

type TExecute = (req: IUpdateCommentRequest) => Promise<TUpdateCommentResponse>

type THandle = RequestHandler<
  void,
  TUpdateCommentResponse,
  IUpdateCommentRequest
>

export type { TExecute, THandle }
