import { PostModel } from '../models/PostModel.'
import { IPostsRepository } from './IPostsRepository.types'

import { IFeedModel } from '@common/types/posts/models/feedModel.types'

class PostsRepositoryInMemory implements IPostsRepository {
  private posts: PostModel[] = []

  joinUsers: () => Promise<IFeedModel[]>

  create: IPostsRepository['create'] = async data => {
    const newUser = new PostModel()

    Object.assign(newUser, data)

    this.posts.push(newUser)

    return newUser
  }

  delete: IPostsRepository['delete'] = async id => {
    const indexToDelete = this.posts.findIndex(post => post.id === id)

    this.posts.splice(indexToDelete, 1)
  }

  findById: IPostsRepository['findById'] = async id =>
    this.posts.find(post => post.id === id)

  findAll: IPostsRepository['findAll'] = async () => this.posts
}

export { PostsRepositoryInMemory }
