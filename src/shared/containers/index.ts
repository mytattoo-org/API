import { UsersRepository } from '@modules/Users/repositories/User/UserRepository'

import { container } from 'tsyringe'

import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
