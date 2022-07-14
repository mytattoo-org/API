import { RequestHandler } from 'express'

import {
  IReadPostsRequestParams,
  TReadPostsResponse
} from '@common/types/posts/useCases/readPosts.types'

type TExecute = (
  id?: IReadPostsRequestParams['id']
) => Promise<TReadPostsResponse>

type THandle = RequestHandler<IReadPostsRequestParams, TReadPostsResponse, void>

export type { TExecute, THandle }
