import { UserModel } from '@modules/Users/models/UserModel'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

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

  update: IUsersRepository['update'] = async data => {
    const foundIndex = this.users.findIndex(({ id }) => id === data.id)

    let userToBeUpdated = this.users[foundIndex]

    userToBeUpdated = { ...userToBeUpdated, ...data }

    return userToBeUpdated
  }

  findById: IUsersRepository['findById'] = async id =>
    this.users.find(user => user.id === id)

  findByEmail: IUsersRepository['findByEmail'] = async email =>
    this.users.find(user => user.email.toLowerCase() === email.toLowerCase())

  findByUsername: IUsersRepository['findByUsername'] = async username =>
    this.users.find(
      user => user.username.toLowerCase() === username.toLowerCase()
    )

  findAll: IUsersRepository['findAll'] = async () => this.users
}

export { UsersRepositoryInMemory }
