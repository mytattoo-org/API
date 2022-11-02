import { inject, injectable } from 'tsyringe'

import { TExecute } from './CreateComment.types'

import { formatComment } from '@modules/Comments/formatter'
import { CommentModel } from '@modules/Comments/models/CommentModel'
import { ICommentsRepository } from '@modules/Comments/repositories/ICommentsRepository.types'
import { AppError } from '@modules/Error/models/AppError'
import type { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'

@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  execute: TExecute = async dataToCreate => {
    if (!dataToCreate.user_id && !dataToCreate.post_id && !dataToCreate.content)
      throw new AppError('Missing request data', 400)

    const postExists = await this.postsRepository.findById(dataToCreate.post_id)

    if (!postExists) throw new AppError('Post not found', 404)

    const userExists = await this.usersRepository.findById(dataToCreate.user_id)

    if (!userExists) throw new AppError('User not found', 404)

    const newComment = new CommentModel()

    Object.assign(newComment, { ...dataToCreate })

    const createdComment = formatComment(
      await this.commentsRepository.create(newComment)
    )

    return { createdComment }
  }
}

export { CreateCommentService }
