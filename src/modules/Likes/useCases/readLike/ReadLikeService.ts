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

  execute: TExecute = async ({ post_id, user_id }) => {
    if (!post_id && !user_id)
      throw new AppError('post_id or user_id needed', 400)

    if (post_id && user_id)
      throw new AppError('Which between post_id or user_id', 400)

    if (post_id)
      return { likes: await this.likesRepository.findByPostId(post_id) }

    if (user_id)
      return { likes: await this.likesRepository.findByUserId(user_id) }
  }
}

export { ReadLikeService }
