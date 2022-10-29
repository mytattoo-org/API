import { inject, injectable } from 'tsyringe'

import { TExecute } from './readComments.types'

import { ICommentsRepository } from '@modules/Comments/repositories/ICommentsRepository.types'
import { AppError } from '@modules/Error/models/AppError'

import { ICommentUser } from '@common/types/comments/models/commentUserModel'

@injectable()
class ReadCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  execute: TExecute = async ({ post_id: postId, user_id: userId }) => {
    if (!postId && !userId) throw new AppError('postId or userId needed', 400)

    if (postId && userId)
      return {
        comments: await this.commentsRepository.findByPostAndUserId({
          post_id: postId,
          user_id: userId
        })
      }

    if (postId) {
      const comments = await this.commentsRepository.findByPostId(postId)

      const formattedComments: ICommentUser[] = comments.map(
        ({ artist, avatar, user_id: authorId, username, ...rest }) => ({
          author: { avatar, artist, username, id: authorId },
          ...rest
        })
      )

      return { comments: formattedComments }
    }

    return { comments: await this.commentsRepository.findByUserId(userId) }
  }
}

export { ReadCommentsService }
