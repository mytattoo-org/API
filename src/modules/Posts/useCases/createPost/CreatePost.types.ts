import { RequestHandler } from 'express'

import { IPostModel } from '@common/types/posts/models/postModel.types'
import { IUserModel } from '@common/types/users/models/userModel.types'

interface ICreatePostRequest {
  image: string
  user_id: IUserModel['id']
  description?: IPostModel['description']
}

interface ICreatePostResponse {
  createdPost: Omit<IPostModel, 'image'> & { image: string }
}

type TExecute = (
  dataToCreate: ICreatePostRequest
) => Promise<ICreatePostResponse>

type THandle = RequestHandler<void, ICreatePostResponse, ICreatePostRequest>

export type { TExecute, THandle, ICreatePostResponse }
