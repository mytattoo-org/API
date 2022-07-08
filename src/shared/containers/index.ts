import { container } from 'tsyringe'

import { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'
import { PostsRepository } from '@modules/Posts/repositories/PostsRepository'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'
import { UsersRepository } from '@modules/Users/repositories/User/UserRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository
)
