import { SignInService } from './SignInService'

import { AppError } from '@modules/Error/models/AppError'
import { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'
import { CreateUserService } from '@modules/Users/useCases/createUser/CreateUserService'

let signInService: SignInService
let usersRepository: IUsersRepository
let createUserService: CreateUserService

describe('SignInService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    signInService = new SignInService(usersRepository)
    createUserService = new CreateUserService(usersRepository)
  })

  it('should be able to be authenticated', async () => {
    const createUserData = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    const createUserResponse = await createUserService.execute(createUserData)

    const signInResponse = await signInService.execute({
      password: 'Miguel@1234',
      usernameOrEmail: 'instintos'
    })

    expect(signInResponse.id).toBe(createUserResponse.createdUser.id)
  })

  it('should not be able to be authenticated if email is invalid', async () => {
    const createUserData = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    await createUserService.execute(createUserData)

    await expect(
      signInService.execute({
        usernameOrEmail: 'e-mail',
        password: createUserData.password
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to be authenticated if password is invalid', async () => {
    const createUserData = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    await createUserService.execute(createUserData)

    await expect(
      signInService.execute({
        password: 'password',
        usernameOrEmail: createUserData.email
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to not send request data', async () => {
    await expect(
      signInService.execute({ usernameOrEmail: '', password: '' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
