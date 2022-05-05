import type { TExecute } from './SignIn.types'
import { AppError } from '@modules/Error/entities/AppError'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

@injectable()
class SignInService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async ({ usernameOrEmail, password }) => {
    if (!usernameOrEmail || !password)
      throw new AppError(
        'Needed to inform username or email, and password',
        400
      )

    const foundUser = usernameOrEmail.includes('@')
      ? await this.usersRepository.findByEmail(usernameOrEmail)
      : await this.usersRepository.findByUsername(usernameOrEmail)

    if (!foundUser) throw new AppError('Email or password invalid', 401)

    const authorized = await bcrypt.compare(password, foundUser.password)

    if (!authorized) throw new AppError('Email or password invalid', 401)

    const token = jwt.sign({}, process.env.JWT_SECRET, {
      subject: foundUser.id,
      expiresIn: '1d'
    })

    return { token, id: foundUser.id }
  }
}

export { SignInService }
