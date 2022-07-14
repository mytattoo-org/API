import { CreatePostService } from './CreatePostService'

import { PostsRepositoryInMemory } from '@modules/Posts/repositories/PostsRepositoryInMemory'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'
import { CreateUserService } from '@modules/Users/useCases/createUser/CreateUserService'

import { bufferToB64 } from '@shared/utils/b64'

let createPostService: CreatePostService
let createUserService: CreateUserService
let postsRepository: PostsRepositoryInMemory
let usersRepository: UsersRepositoryInMemory

describe('CreatePostService', () => {
  beforeEach(() => {
    postsRepository = new PostsRepositoryInMemory()
    usersRepository = new UsersRepositoryInMemory()
    createUserService = new CreateUserService(usersRepository)
    createPostService = new CreatePostService(postsRepository, usersRepository)
  })

  it('should be able to create a new Post', async () => {
    const { createdUser } = await createUserService.execute({
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'email@email.com'
    })

    const dataToCreate = { image: 'any-image', user_id: createdUser.id }
    const { createdPost } = await createPostService.execute(dataToCreate)

    expect({
      image: createdPost.image,
      user_id: createdPost.user_id
    }).toStrictEqual(dataToCreate)

    const posts = await postsRepository.findAll()

    expect({
      user_id: posts[0].user_id,
      image: bufferToB64(posts[0].image)
    }).toStrictEqual(dataToCreate)
  })

  it('should not be able to create a new Post without request data', async () => {
    const dataToCreate = {}

    try {
      await createPostService.execute(dataToCreate as any)
    } catch (error) {
      expect(error.message).toBe('Missing request data')
    }
  })

  it('should not be able to create a new Post without request data', async () => {
    const dataToCreate = { image: 'any-image', user_id: 'any-invalid-user_id' }

    try {
      await createPostService.execute(dataToCreate)
    } catch (error) {
      expect(error.message).toBe('User not found')
    }
  })
})
