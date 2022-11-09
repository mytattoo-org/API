import { RequestHandler } from 'express'

import {
  IUpdatePostRequest,
  TUpdatePostResponse
} from '@common/types/posts/useCases/updatePost.types'

type TExecute = (req: IUpdatePostRequest) => Promise<TUpdatePostResponse>

type THandle = RequestHandler<void, TUpdatePostResponse, IUpdatePostRequest>

export type { TExecute, THandle }
