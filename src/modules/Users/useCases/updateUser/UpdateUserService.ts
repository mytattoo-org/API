import { inject, injectable } from 'tsyringe'

import type { TExecute } from './UpdateUser.types'

import { AppError } from '@modules/Error/models/AppError'
import { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

@injectable()
class UpdateUserService {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async dataToUpdate => {
    const user = await this.usersRepository.findById(dataToUpdate.id)

    if (!user) throw new AppError('User not found', 400)

    if (
      dataToUpdate.username &&
      (await this.usersRepository.findByUsername(dataToUpdate.username))
    )
      throw new AppError('Username already exists')

    if (
      dataToUpdate.email &&
      (await this.usersRepository.findByEmail(dataToUpdate.email))
    )
      throw new AppError('Email already exists')

    const updatedUser = await this.usersRepository.update(dataToUpdate)

    return { updatedUser }
  }
}

export { UpdateUserService }
