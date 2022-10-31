import {
  ICommentModel,
  ICommentUser
} from '@common/types/comments/models/commentModel'
import type { IPostModel } from '@common/types/posts/models/postModel.types'
import type { IUserModel } from '@common/types/users/models/userModel.types'

type TUpdate = (data: {
  id: ICommentModel['id']
  content: ICommentModel['content']
}) => Promise<ICommentModel>

type TFindByPostAndUserId = (data: {
  user_id: ICommentModel['user_id']
  post_id: ICommentModel['post_id']
}) => Promise<ICommentUser[]>

type TDelete = (id: ICommentModel['id']) => Promise<void>
type TCreate = (data: ICommentModel) => Promise<ICommentUser>
type TFindById = (id: ICommentModel['id']) => Promise<ICommentUser>
type TFindByUserId = (userId: IUserModel['id']) => Promise<ICommentUser[]>
type TFindByPostId = (postId: IPostModel['id']) => Promise<ICommentUser[]>

interface ICommentsRepository {
  create: TCreate
  update: TUpdate
  delete: TDelete
  findById: TFindById
  findByUserId: TFindByUserId
  findByPostId: TFindByPostId
  findByPostAndUserId: TFindByPostAndUserId
}

export type { ICommentsRepository }
