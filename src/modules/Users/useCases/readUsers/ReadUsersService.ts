import type { TExecute } from './ReadUsers.types'

import { inject, injectable } from 'tsyringe'

import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

@injectable()
class ReadUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async id => {
    if (id) {
      const user = await this.usersRepository.findById(id)

      delete user.password

      return { user }
    }

    const users = await this.usersRepository.findAll()

    const usersWithoutPassword = users.map(user => {
      delete user.password

      return user
    })

    return { users: usersWithoutPassword }
  }
}

export { ReadUsersService }
