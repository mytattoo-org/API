import { inject, injectable } from 'tsyringe'

import { TExecute } from './readComments.types'

import { ICommentsRepository } from '@modules/Comments/repositories/ICommentsRepository.types'
import { AppError } from '@modules/Error/models/AppError'

@injectable()
class ReadCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  execute: TExecute = async ({ post_id, user_id }) => {
    if (!post_id && !user_id)
      throw new AppError('post_id or user_id needed', 400)

    if (post_id && user_id)
      throw new AppError('Which between post_id or user_id', 400)

    if (post_id)
      return { comments: await this.commentsRepository.findByPostId(post_id) }

    if (user_id)
      return { comments: await this.commentsRepository.findByUserId(user_id) }
  }
}

export { ReadCommentsService }
