import { inject, injectable } from 'tsyringe'

import type { TExecute } from './DeleteUser.types'

import { AppError } from '@modules/Error/models/AppError'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

import { bufferToB64 } from '@shared/utils/b64'

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

    return {
      deletedUser: { ...foundUser, avatar: bufferToB64(foundUser.avatar) }
    }
  }
}

export { DeleteUserService }
