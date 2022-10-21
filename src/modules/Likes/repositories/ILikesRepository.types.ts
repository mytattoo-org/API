import { ILikeModel } from '@common/types/likes/models/likeModel.types'
import type { IPostModel } from '@common/types/posts/models/postModel.types'
import type { IUserModel } from '@common/types/users/models/userModel.types'

type TCreate = (data: ILikeModel) => Promise<ILikeModel>

type TFindByUserId = (userId: IUserModel['id']) => Promise<ILikeModel[]>

type TFindById = (id: ILikeModel['id']) => Promise<ILikeModel>

type TFindByPostId = (postId: IPostModel['id']) => Promise<ILikeModel[]>

type TDelete = (id: ILikeModel['id']) => Promise<void>

interface ILikesRepository {
  create: TCreate
  delete: TDelete
  findById: TFindById
  findByUserId: TFindByUserId
  findByPostId: TFindByPostId
}

export type { ILikesRepository }
