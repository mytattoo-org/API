import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import type { TExecute } from './UpdateUser.types'

import { AppError } from '@modules/Error/models/AppError'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

import { b64ToBuffer } from '@shared/utils/b64'

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async dataToUpdate => {
    if (!dataToUpdate.password) throw new AppError('Missing password', 400)

    const user = await this.usersRepository.findById(dataToUpdate.id)

    if (!user) throw new AppError('User not found', 404)

    const authorized = await bcrypt.compare(
      dataToUpdate.password,
      user.password
    )

    if (!authorized) throw new AppError('Invalid password')

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

    const finalDataToUpdate = {
      ...dataToUpdate,
      newPassword: undefined,
      avatar: dataToUpdate.avatar
        ? b64ToBuffer(dataToUpdate.avatar)
        : undefined,
      password: dataToUpdate.newPassword
        ? bcrypt.hashSync(dataToUpdate.newPassword, 10)
        : undefined
    }

    const updatedUser = await this.usersRepository.update(finalDataToUpdate)

    updatedUser.avatar = finalDataToUpdate.avatar
    updatedUser.password = undefined

    return { updatedUser }
  }
}

export { UpdateUserService }
