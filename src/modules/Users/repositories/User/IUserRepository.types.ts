import { UserModel } from '../../entities/UserModel'

type TCreate = (data: UserModel) => Promise<UserModel>

type TFindById = (id: UserModel['id']) => Promise<UserModel>

type TFindAll = () => Promise<UserModel[]>

type TFindByUsername = (
  username: UserModel['username']
) => Promise<UserModel | undefined>

type TFindByEmail = (
  email: UserModel['email']
) => Promise<UserModel | undefined>

type TDelete = (id: UserModel['id']) => Promise<void>

interface IUsersRepository {
  create: TCreate
  delete: TDelete
  findAll: TFindAll
  findById: TFindById
  findByEmail: TFindByEmail
  findByUsername: TFindByUsername
}

export type { IUsersRepository }
