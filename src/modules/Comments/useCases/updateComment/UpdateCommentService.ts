import { inject, injectable } from 'tsyringe'

import { TExecute } from './updateComment.types'

import { ICommentsRepository } from '@modules/Comments/repositories/ICommentsRepository.types'
import { AppError } from '@modules/Error/models/AppError'

@injectable()
class UpdateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  execute: TExecute = async ({ id, content }) => {
    if (!id) throw new AppError('id needed', 400)

    const updatedComment = await this.commentsRepository.update({ id, content })

    return { updatedComment }
  }
}

export { UpdateCommentService }
