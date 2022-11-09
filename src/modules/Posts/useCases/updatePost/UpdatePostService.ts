import { inject, injectable } from 'tsyringe'

import { TExecute } from './updatePost.types'

import { AppError } from '@modules/Error/models/AppError'
import { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'

import { b64ToBuffer, bufferToB64 } from '@shared/utils/b64'

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  execute: TExecute = async ({ id, description, image, user_id }) => {
    if (!id || !user_id) throw new AppError('id needed', 400)

    const foundPost = await this.postsRepository.findById(id)

    if (foundPost.user_id !== user_id)
      throw new AppError("This user isn't the author of this post")

    const updatedPost = await this.postsRepository.update({
      id,
      description,
      image: b64ToBuffer(image)
    })

    return {
      updatedPost: { ...updatedPost, image: bufferToB64(updatedPost.image) }
    }
  }
}

export { UpdatePostService }
