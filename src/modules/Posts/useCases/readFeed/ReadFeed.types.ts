import type { RequestHandler } from 'express'

import type { TFeedResponse } from '@common/types/posts/useCases/readFeed.types'

type TExecute = () => Promise<TFeedResponse>

type THandle = RequestHandler<void, TFeedResponse, void>

export type { TExecute, THandle }
