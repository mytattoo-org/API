import { inject, injectable } from 'tsyringe'

import { TExecute } from './CreatePost.types'

import { AppError } from '@modules/Error/models/AppError'
import { PostModel } from '@modules/Posts/models/PostModel.'
import { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'
import { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

import { b64ToBuffer, bufferToB64 } from '@shared/utils/b64'

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async dataToCreate => {
    if (!dataToCreate.image || !dataToCreate.user_id)
      throw new AppError('Missing request data', 400)

    const foundUser = await this.usersRepository.findById(dataToCreate.user_id)

    if (!foundUser) throw new AppError('User not found', 404)

    const newPost = new PostModel()

    Object.assign(newPost, {
      ...dataToCreate,
      image: b64ToBuffer(dataToCreate.image)
    })

    const createdPost = await this.postsRepository.create(newPost)

    return {
      createdPost: { ...createdPost, image: bufferToB64(createdPost.image) }
    }
  }
}

export { CreatePostService }
