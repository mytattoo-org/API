import type { IFeedModel } from '@common/types/posts/models/feedModel.types'
import type { IPostModel } from '@common/types/posts/models/postModel.types'

interface IUpdateParams {
  id: IPostModel['id']
  image: IPostModel['image']
  description: IPostModel['description']
}

type TCreate = (data: IPostModel) => Promise<IPostModel>

type TUpdate = (data: IUpdateParams) => Promise<IPostModel>

type TFindById = (id: IPostModel['id']) => Promise<IPostModel>

type TFindAll = () => Promise<IPostModel[]>

type TDelete = (id: IPostModel['id']) => Promise<void>

type TJoinUsers = () => Promise<IFeedModel[]>

interface IPostsRepository {
  update: TUpdate
  create: TCreate
  delete: TDelete
  findAll: TFindAll
  findById: TFindById
  joinUsers: TJoinUsers
}

export type { IPostsRepository }
