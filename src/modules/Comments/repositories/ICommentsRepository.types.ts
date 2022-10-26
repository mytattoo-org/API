import { ICommentModel } from '@common/types/comments/models/commentModel'
import type { IPostModel } from '@common/types/posts/models/postModel.types'
import type { IUserModel } from '@common/types/users/models/userModel.types'

type TUpdate = (data: {
  id: ICommentModel['id']
  content: ICommentModel['content']
}) => Promise<ICommentModel>

type TCreate = (data: ICommentModel) => Promise<ICommentModel>

type TFindByUserId = (userId: IUserModel['id']) => Promise<ICommentModel[]>

type TFindById = (id: ICommentModel['id']) => Promise<ICommentModel>

type TFindByPostId = (postId: IPostModel['id']) => Promise<ICommentModel[]>

type TDelete = (id: ICommentModel['id']) => Promise<void>

interface ICommentsRepository {
  create: TCreate
  update: TUpdate
  delete: TDelete
  findById: TFindById
  findByUserId: TFindByUserId
  findByPostId: TFindByPostId
}

export type { ICommentsRepository }
