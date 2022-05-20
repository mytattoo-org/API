import type { TExecute } from './CreateUser.types'

import { AppError } from '@modules/Error/entities/AppError'
import { UserModel } from '@modules/Users/entities/UserModel'

import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async data => {
    const foundUserByEmail = await this.usersRepository.findByEmail(data.email)

    if (foundUserByEmail) throw new AppError('E-mail already exists', 400)

    const foundUserByUsername = await this.usersRepository.findByUsername(
      data.username
    )

    if (foundUserByUsername) throw new AppError('Username already exists', 400)

    const newUser = new UserModel()

    Object.assign(newUser, data)

    newUser.password = bcrypt.hashSync(data.password, 10)

    const createdUser = await this.usersRepository.create(newUser)

    return { createdUser: { ...createdUser, password: undefined } }
  }
}

export { CreateUserService }
