import { inject, injectable } from 'tsyringe'

import type { TExecute } from './ReadUsers.types'

import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

@injectable()
class ReadUsersService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  execute: TExecute = async id => {
    if (id) {
      const user = await this.usersRepository.findById(id)

      return user ? { user: { ...user, password: undefined } } : undefined
    }

    const users = await this.usersRepository.findAll()

    const usersWithoutPassword = users.map(user => ({
      ...user,
      password: undefined
    }))

    return { users: usersWithoutPassword }
  }
}

export { ReadUsersService }
