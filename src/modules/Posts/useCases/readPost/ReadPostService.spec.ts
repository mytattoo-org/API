import { CreatePostService } from '../createPost/CreatePostService'
import { ReadPostService } from '../readPost/ReadPostService'

import { PostsRepositoryInMemory } from '@modules/Posts/repositories/PostsRepositoryInMemory'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'
import { CreateUserService } from '@modules/Users/useCases/createUser/CreateUserService'

let readPostsService: ReadPostService
let createPostService: CreatePostService
let createUserService: CreateUserService

let postsRepository: PostsRepositoryInMemory
let usersRepository: UsersRepositoryInMemory

describe('ReadPostService', () => {
  beforeEach(() => {
    postsRepository = new PostsRepositoryInMemory()
    usersRepository = new UsersRepositoryInMemory()
    readPostsService = new ReadPostService(postsRepository)
    createUserService = new CreateUserService(usersRepository)
    createPostService = new CreatePostService(postsRepository, usersRepository)
  })

  it('should be able to read sigle post', async () => {
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

    const { post } = await readPostsService.execute(createdPost.id)

    expect(post).toStrictEqual(createdPost)
  })

  it('should be able to read multiple posts', async () => {
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

    const { createdPost: createdSecondPost } = await createPostService.execute({
      image: 'image2',
      description: 'description2',
      user_id: createdUser.createdUser.id
    })

    const { posts } = await readPostsService.execute()

    expect([createdPost, createdSecondPost]).toStrictEqual(posts)
  })
})
