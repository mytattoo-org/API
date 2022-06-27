import type { TExecute } from './SignIn.types'
import { AppError } from '@modules/Error/models/AppError'

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
        'Need to provide username or email, and password',
        400
      )

    const foundUser = usernameOrEmail.includes('@')
      ? await this.usersRepository.findByEmail(usernameOrEmail)
      : await this.usersRepository.findByUsername(usernameOrEmail, true)

    if (!foundUser) throw new AppError('Invalid email or password', 401)

    const authorized = await bcrypt.compare(password, foundUser.password)

    if (!authorized) throw new AppError('Invalid email or password', 401)

    const token = jwt.sign({}, process.env.API_JWT_SECRET, {
      subject: foundUser.id,
      expiresIn: '1d'
    })

    return { token, id: foundUser.id }
  }
}

export { SignInService }
