import { RequestHandler } from 'express'

import {
  IDeletePostRequestParams,
  TDeletePostResponse
} from '@common/types/posts/useCases/deletePost.types'

type TExecute = (
  id: IDeletePostRequestParams['id']
) => Promise<TDeletePostResponse>

type THandle = RequestHandler<
  IDeletePostRequestParams,
  TDeletePostResponse,
  void
>

export type { TExecute, THandle }
