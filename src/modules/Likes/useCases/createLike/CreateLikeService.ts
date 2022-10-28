import { inject, injectable } from 'tsyringe'

import { TExecute } from './CreateLike.types'

import { AppError } from '@modules/Error/models/AppError'
import { LikeModel } from '@modules/Likes/models/LikeModel'
import { ILikesRepository } from '@modules/Likes/repositories/ILikesRepository.types'
import type { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

@injectable()
class CreateLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async dataToCreate => {
    if (!dataToCreate.user_id && !dataToCreate.post_id)
      throw new AppError('Missing request data', 400)

    const postExists = await this.postsRepository.findById(dataToCreate.post_id)

    if (!postExists) throw new AppError('Post not found', 404)

    const userExists = await this.usersRepository.findById(dataToCreate.user_id)

    if (!userExists) throw new AppError('User not found', 404)

    const foundByPost = await this.likesRepository.findByUserAndPostId({
      post_id: dataToCreate.post_id,
      user_id: dataToCreate.user_id
    })

    if (foundByPost) throw new AppError('Like already exists', 400)

    const newLike = new LikeModel()

    Object.assign(newLike, { ...dataToCreate })

    const createdLike = await this.likesRepository.create(newLike)

    return { createdLike }
  }
}

export { CreateLikeService }
