import { inject, injectable } from 'tsyringe'

import type { TExecute } from './ReadUsers.types'

import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

import { bufferToB64 } from '@shared/utils/b64'

@injectable()
class ReadUsersService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async id => {
    if (id) {
      const user = await this.usersRepository.findById(id)

      return user
        ? {
            user: {
              ...user,
              password: undefined,
              avatar: bufferToB64(user.avatar)
            }
          }
        : undefined
    }

    const users = await this.usersRepository.findAll()

    const usersWithoutPassword = users.map(user => ({
      ...user,
      password: undefined,
      avatar: bufferToB64(user.avatar)
    }))

    return { users: usersWithoutPassword }
  }
}

export { ReadUsersService }
