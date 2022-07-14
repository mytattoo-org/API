import { inject, injectable } from 'tsyringe'

import type { TExecute } from './ReadFeed.types'

import type { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'

import { bufferToB64 } from '@shared/utils/b64'

import type { IFeed } from '@common/types/posts/models/feedModel.types'

@injectable()
class ReadFeedService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  execute: TExecute = async () => {
    const posts = await this.postsRepository.joinUsers()

    const formattedPosts: IFeed[] = posts.map(post => ({
      id: post.id,
      image: bufferToB64(post.image),
      created_at: post.created_at,
      description: post.description,
      author: {
        id: post.user_id,
        artist: post.artist,
        username: post.username,
        avatar: bufferToB64(post.avatar)
      }
    }))

    return { posts: formattedPosts }
  }
}

export { ReadFeedService }
