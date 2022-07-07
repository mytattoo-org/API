import type { IPostModel } from '@common/types/posts/models/postModel.types'

type TCreate = (data: IPostModel) => Promise<IPostModel>

type TFindById = (id: IPostModel['id']) => Promise<IPostModel>

type TFindAll = () => Promise<IPostModel[]>

type TDelete = (id: IPostModel['id']) => Promise<void>

type TUpdate = (data: Partial<IPostModel>) => Promise<IPostModel>

interface IPostsRepository {
  update: TUpdate
  create: TCreate
  delete: TDelete
  findAll: TFindAll
  findById: TFindById
}

export type { IPostsRepository }
