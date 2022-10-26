import { RequestHandler } from 'express'

import {
  ICreateCommentRequest,
  TCreateCommentResponse
} from '@common/types/comments/useCases/createComment.types'

type TExecute = (
  dataToCreate: ICreateCommentRequest
) => Promise<TCreateCommentResponse>

type THandle = RequestHandler<
  void,
  TCreateCommentResponse,
  ICreateCommentRequest
>

export type { TExecute, THandle }
