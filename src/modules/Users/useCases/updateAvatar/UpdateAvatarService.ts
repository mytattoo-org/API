import { TExecute } from './UpdateAvatar.types'

import { AppError } from '@modules/Error/models/AppError'
import { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'
import { inject, injectable } from 'tsyringe'
import fs from "fs"

@injectable()
class UpdateAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async ({ filename, id }) => {
    const foundById = await this.usersRepository.findById(id)

    if (!foundById) throw new AppError('User not found', 404)

    if(foundById.avatar)
      fs.unlinkSync(`./temp/avatar/${foundById.avatar}`)


    const updatedUser = await this.usersRepository.update({ avatar: filename, id })

    updatedUser.password = undefined

    return { updatedUser }
  }
}

export { UpdateAvatarService }
