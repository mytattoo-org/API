import { inject, injectable } from 'tsyringe'

import { TExecute } from './DeleteComment.types'

import { CommentsRepository } from '@modules/Comments/repositories/CommentsRepository'
import { AppError } from '@modules/Error/models/AppError'

@injectable()
class DeleteCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: CommentsRepository
  ) {}

  execute: TExecute = async id => {
    const foundComment = await this.commentsRepository.findById(id)

    if (!foundComment) throw new AppError('Comment not found')

    await this.commentsRepository.delete(id)

    return { deletedComment: foundComment }
  }
}

export { DeleteCommentService }
