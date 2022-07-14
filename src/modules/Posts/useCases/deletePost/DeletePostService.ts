import { inject, injectable } from 'tsyringe'

import { TExecute } from './DeletePost.types'

import { AppError } from '@modules/Error/models/AppError'
import { PostsRepository } from '@modules/Posts/repositories/PostsRepository'

import { bufferToB64 } from '@shared/utils/b64'

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: PostsRepository
  ) {}

  execute: TExecute = async id => {
    const foundPost = await this.postsRepository.findById(id)

    if (!foundPost) throw new AppError('Post not found')

    await this.postsRepository.delete(id)

    return {
      deletedPost: { ...foundPost, image: bufferToB64(foundPost.image) }
    }
  }
}

export { DeletePostService }
