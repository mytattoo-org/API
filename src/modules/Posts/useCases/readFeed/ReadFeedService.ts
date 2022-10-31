import { inject, injectable } from 'tsyringe'

import type { TExecute } from './ReadFeed.types'

import { ILikesRepository } from '@modules/Likes/repositories/ILikesRepository.types'
import type { IPostsRepository } from '@modules/Posts/repositories/IPostsRepository.types'

import { bufferToB64 } from '@shared/utils/b64'

import type { IFeed } from '@common/types/posts/models/feedModel.types'

@injectable()
class ReadFeedService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('LikesRepository')
    private likesRepository: ILikesRepository
  ) {}

  execute: TExecute = async authenticatedUserId => {
    const posts = await this.postsRepository.joinUsers()

    const formattedPosts: IFeed[] = []

    for (const post of posts) {
      const foundLike = authenticatedUserId
        ? await this.likesRepository.findByUserAndPostId({
            post_id: post.id,
            user_id: authenticatedUserId
          })
        : false

      formattedPosts.push({
        id: post.id,
        liked: !!foundLike,
        created_at: post.created_at,
        description: post.description,
        image: bufferToB64(post.image),
        author: {
          id: post.user_id,
          username: post.username,
          avatar: bufferToB64(post.avatar)
        }
      })
    }

    return { posts: formattedPosts }
  }
}

export { ReadFeedService }
