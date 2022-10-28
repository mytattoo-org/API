import { inject, injectable } from 'tsyringe'

import { TExecute } from './readLike.types'

import { AppError } from '@modules/Error/models/AppError'
import { ILikesRepository } from '@modules/Likes/repositories/ILikesRepository.types'

@injectable()
class ReadLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository
  ) {}

  execute: TExecute = async ({ post_id: postId, user_id: userId }) => {
    if (!postId && !userId) throw new AppError('post_id or user_id needed', 400)

    if (postId && userId)
      return {
        like: await this.likesRepository.findByUserAndPostId({
          post_id: postId,
          user_id: userId
        })
      }

    return userId
      ? { likes: await this.likesRepository.findByUserId(userId) }
      : { likes: await this.likesRepository.findByPostId(postId) }
  }
}

export { ReadLikeService }
