import { inject, injectable } from 'tsyringe'

import { TExecute } from './ReadPost.types'

import { AppError } from '@modules/Error/models/AppError'
import { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'

import { bufferToB64 } from '@shared/utils/b64'

@injectable()
class ReadPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  execute: TExecute = async id => {
    if (id) {
      const post = await this.postsRepository.findById(id)

      if (!post) throw new AppError('Post not found')

      return { post: { ...post, image: bufferToB64(post.image) } }
    }

    const posts = await this.postsRepository.findAll()

    const postsWithoutPassword = posts.map(post => ({
      ...post,
      image: bufferToB64(post.image)
    }))

    return { posts: postsWithoutPassword }
  }
}

export { ReadPostService }
