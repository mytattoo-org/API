import { inject, injectable } from 'tsyringe'

import { TExecute } from './CreatePost.types'

import { AppError } from '@modules/Error/models/AppError'
import { PostModel } from '@modules/Posts/models/PostModel.'
import type { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

import { b64ToBuffer, bufferToB64 } from '@shared/utils/b64'

import type { IFeed } from '@common/types/posts/models/feedModel.types'

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

    const createdPost = {
      ...(await this.postsRepository.create(newPost)),
      image: dataToCreate.image
    }

    const createdFeed: IFeed = {
      liked: false,
      id: createdPost.id,
      image: dataToCreate.image,
      created_at: createdPost.created_at,
      description: createdPost.description,
      author: {
        id: foundUser.id,
        artist: foundUser.artist,
        username: foundUser.username,
        avatar: bufferToB64(foundUser.avatar)
      }
    }

    return { createdPost, createdFeed }
  }
}

export { CreatePostService }
