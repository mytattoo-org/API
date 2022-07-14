import { RequestHandler } from 'express'

import {
  ICreatePostRequest,
  TCreatePostResponse
} from '@common/types/posts/useCases/createPost.types'

type TExecute = (
  dataToCreate: ICreatePostRequest
) => Promise<TCreatePostResponse>

type THandle = RequestHandler<void, TCreatePostResponse, ICreatePostRequest>

export type { TExecute, THandle }
