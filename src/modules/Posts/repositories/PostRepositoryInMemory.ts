import { PostModel } from '../models/PostModel.'
import { IPostsRepository } from './IPostsRepository.types'

class PostRepositoryInMemory implements IPostsRepository {
  private posts: PostModel[] = []

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

  update: IPostsRepository['update'] = async data => {
    const foundIndex = this.posts.findIndex(({ id }) => id === data.id)

    let postToBeUpdated = this.posts[foundIndex]

    postToBeUpdated = { ...postToBeUpdated, ...data }

    return postToBeUpdated
  }

  findById: IPostsRepository['findById'] = async id =>
    this.posts.find(post => post.id === id)

  findAll: IPostsRepository['findAll'] = async () => this.posts
}

export { PostRepositoryInMemory }
