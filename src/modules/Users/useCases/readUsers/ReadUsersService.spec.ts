import { CreateUserService } from '../createUser/CreateUserService'
import { ReadUsersService } from './ReadUsersService'

import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'

let usersRepository: IUsersRepository
let readUsersService: ReadUsersService
let createUserService: CreateUserService

describe('ReadUsersService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    readUsersService = new ReadUsersService(usersRepository)
    createUserService = new CreateUserService(usersRepository)
  })

  it('should be able to read a user using id', async () => {
    const createUserData = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    const createdUserResponse = await createUserService.execute(createUserData)

    const foundUser = await readUsersService.execute(
      createdUserResponse.createdUser.id
    )

    expect(foundUser.user.username).toBe(createUserData.username)
  })

  it('should be able to read all users without use id', async () => {
    const createUserData = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    const createSecondUserData = {
      username: 'InSTinToS2',
      password: 'Miguel@1234',
      email: 'instintos2@instintos.com'
    }

    createUserService.execute(createUserData)

    await createUserService.execute(createSecondUserData)

    const foundUsers = await readUsersService.execute()

    expect(foundUsers.users[0].username).toBe(createUserData.username)
    expect(foundUsers.users[1].username).toBe(createSecondUserData.username)
  })
})
