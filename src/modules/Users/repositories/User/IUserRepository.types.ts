import { UserModel } from '../../models/UserModel'

import { IUserModel } from '@common/types/users/models/userModel.types'

type TCreate = (data: UserModel) => Promise<UserModel>

type TFindById = (id: UserModel['id']) => Promise<UserModel>

type TFindAll = () => Promise<UserModel[]>

type TFindByUsername = (
  username: UserModel['username'],
  insensitive?: boolean
) => Promise<UserModel | undefined>

type TFindByEmail = (
  email: UserModel['email']
) => Promise<UserModel | undefined>

type TDelete = (id: UserModel['id']) => Promise<void>

type TUpdate = (data: Partial<IUserModel>) => Promise<UserModel>

interface IUsersRepository {
  update: TUpdate
  create: TCreate
  delete: TDelete
  findAll: TFindAll
  findById: TFindById
  findByEmail: TFindByEmail
  findByUsername: TFindByUsername
}

export type { IUsersRepository }
