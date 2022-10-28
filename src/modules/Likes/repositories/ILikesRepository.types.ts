import { ILike, ILikeModel } from '@common/types/likes/models/likeModel.types'
import type { IPostModel } from '@common/types/posts/models/postModel.types'
import type { IUserModel } from '@common/types/users/models/userModel.types'

type TDelete = (like: ILike) => Promise<void>

type TCreate = (data: ILikeModel) => Promise<ILikeModel>

type TFindByUserAndPostId = (like: ILike) => Promise<ILikeModel>

type TFindByUserId = (userId: IUserModel['id']) => Promise<ILikeModel[]>

type TFindByPostId = (postId: IPostModel['id']) => Promise<ILikeModel[]>

interface ILikesRepository {
  create: TCreate
  delete: TDelete
  findByUserId: TFindByUserId
  findByPostId: TFindByPostId
  findByUserAndPostId: TFindByUserAndPostId
}

export type { ILikesRepository }
