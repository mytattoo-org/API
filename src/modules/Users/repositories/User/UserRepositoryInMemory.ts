import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'
import { UserModel } from '@modules/Users/entities/UserModel'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: UserModel[] = []

  create: IUsersRepository['create'] = async data => {
    const newUser = new UserModel()

    Object.assign(newUser, data)

    this.users.push(newUser)

    return newUser
  }

  delete: IUsersRepository['delete'] = async id => {
    const indexToDelete = this.users.findIndex(user => user.id === id)

    this.users.splice(indexToDelete, 1)
  }

  findById: IUsersRepository['findById'] = async id =>
    this.users.find(user => user.id === id)

  findByEmail: IUsersRepository['findByEmail'] = async email =>
    this.users.find(user => user.email === email)

  findByUsername: IUsersRepository['findByUsername'] = async username =>
    this.users.find(user => user.username === username)

  findAll: IUsersRepository['findAll'] = async () => this.users
}

export { UsersRepositoryInMemory }
