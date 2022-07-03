import { inject, injectable } from 'tsyringe'

import type { TExecute } from './DeleteUser.types'

import { AppError } from '@modules/Error/models/AppError'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async id => {
    const foundUser = await this.usersRepository.findById(id)

    if (!foundUser) throw new AppError('User does not exist', 400)

    await this.usersRepository.delete(id)

    return { deletedUser: foundUser }
  }
}

export { DeleteUserService }
