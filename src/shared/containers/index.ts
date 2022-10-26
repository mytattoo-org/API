import { container } from 'tsyringe'

import { CommentsRepository } from '@modules/Comments/repositories/CommentsRepository'
import { ICommentsRepository } from '@modules/Comments/repositories/ICommentsRepository.types'
import type { ILikesRepository } from '@modules/Likes/repositories/ILikesRepository.types'
import { LikesRepository } from '@modules/Likes/repositories/LikesRepository'
import type { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'
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

container.registerSingleton<ILikesRepository>(
  'LikesRepository',
  LikesRepository
)

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository
)
