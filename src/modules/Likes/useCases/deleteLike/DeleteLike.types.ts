import { RequestHandler } from 'express'

import {
  IDeleteLikeRequestParams,
  TDeleteLikeResponse
} from '@common/types/likes/useCases/deleteLike.types'

type TExecute = (
  id: IDeleteLikeRequestParams['id']
) => Promise<TDeleteLikeResponse>

type THandle = RequestHandler<
  IDeleteLikeRequestParams,
  TDeleteLikeResponse,
  void
>

export type { TExecute, THandle }
