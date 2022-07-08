import { CreatePostService } from '../createPost/CreatePostService'
import { ReadPostService } from '../readPost/ReadPostService'
import { DeletePostService } from './DeletePostService'

import { PostsRepositoryInMemory } from '@modules/Posts/repositories/PostsRepositoryInMemory'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'
import { CreateUserService } from '@modules/Users/useCases/createUser/CreateUserService'

let readPostsService: ReadPostService
let createPostService: CreatePostService
let createUserService: CreateUserService
let deletePostService: DeletePostService
let postsRepository: PostsRepositoryInMemory
let usersRepository: UsersRepositoryInMemory

describe('DeletePostService', () => {
  beforeEach(() => {
    postsRepository = new PostsRepositoryInMemory()
    usersRepository = new UsersRepositoryInMemory()
    readPostsService = new ReadPostService(postsRepository)
    deletePostService = new DeletePostService(postsRepository)
    createUserService = new CreateUserService(usersRepository)
    createPostService = new CreatePostService(postsRepository, usersRepository)
  })

  it('should be able to delete a post', async () => {
    const createdUser = await createUserService.execute({
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'email@email.com'
    })

    const { createdPost } = await createPostService.execute({
      image: 'image',
      description: 'description',
      user_id: createdUser.createdUser.id
    })

    await deletePostService.execute(createdPost.id)

    const { posts } = await readPostsService.execute()

    expect(posts.length).toBe(0)
  })

  it('should not be able to delete a post that does not exists', async () => {
    try {
      await deletePostService.execute('any-invalid-id')
    } catch (error) {
      expect(error.message).toBe('Post not found')
    }
  })
})
