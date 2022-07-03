import { CreateUserService } from '../createUser/CreateUserService'

import { AppError } from '@modules/Error/models/AppError'
import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'

import type { ICreateUserRequest } from '@common/types/users/useCases/createUser.types'

let usersRepository: IUsersRepository
let createUserService: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    createUserService = new CreateUserService(usersRepository)
  })

  it('should be able to create a user', async () => {
    const createUserData: ICreateUserRequest = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    const { createdUser } = await createUserService.execute(createUserData)

    const foundUser = await usersRepository.findById(createdUser.id)

    expect(foundUser.username).toBe(createdUser.username)
  })

  it('should not be able to create a user if email already exists', async () => {
    const createUserData: ICreateUserRequest = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    const createSecondUserData: ICreateUserRequest = {
      username: 'InSTinToS2',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    await createUserService.execute(createUserData)

    expect(
      createUserService.execute(createSecondUserData)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a user if username already exists', async () => {
    const createUserData: ICreateUserRequest = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    await createUserService.execute(createUserData)

    const createSecondUserData: ICreateUserRequest = {
      username: 'instintos',
      password: 'Miguel@1234',
      email: 'InSTinToS2@instintos.com'
    }

    expect(
      createUserService.execute(createSecondUserData)
    ).rejects.toBeInstanceOf(AppError)
  })
})
