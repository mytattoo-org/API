import { CreateUserService } from '../createUser/CreateUserService'
import { DeleteUserService } from '../deleteUser/DeleteUserService'
import { ReadUsersService } from '../readUsers/ReadUsersService'
import { IExecuteParams } from './UpdateUser.types'
import { UpdateUserService } from './UpdateUserService'

import { AppError } from '@modules/Error/models/AppError'
import { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'

import {
  ICreateUserRequest,
  TCreateUserResponse
} from '@common/types/users/useCases/createUser.types'
import { TReadUsersResponse } from '@common/types/users/useCases/readUsers.types'

let usersRepository: IUsersRepository
let createUserService: CreateUserService
let updateUserService: UpdateUserService
let deleteUserService: DeleteUserService

const createUserData: ICreateUserRequest = {
  username: 'InSTinToS',
  password: 'InSTinToS@1234',
  email: 'instintos@instintos.com'
}

const createSecondUserData: ICreateUserRequest = {
  username: 'InSTinToS2',
  password: 'InSTinToS@1234',
  email: 'instintos2@instintos.com'
}

let createdUserResponse: TCreateUserResponse
let createdSecondUserResponse: TCreateUserResponse

describe('UpdateUserService', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    createUserService = new CreateUserService(usersRepository)
    updateUserService = new UpdateUserService(usersRepository)

    createdUserResponse = await createUserService.execute(createUserData)
    createdSecondUserResponse = await createUserService.execute(
      createSecondUserData
    )
  })

  afterEach(async () => {
    deleteUserService = new DeleteUserService(usersRepository)

    deleteUserService.execute(createdUserResponse.createdUser.id)
    deleteUserService.execute(createdSecondUserResponse.createdUser.id)
  })

  it('should be able to update username', async () => {
    const updateUserData: IExecuteParams = {
      username: 'InSTinToS3',
      id: createdUserResponse.createdUser.id
    }

    const { updatedUser } = await updateUserService.execute(updateUserData)

    const readUsersService = new ReadUsersService(usersRepository)

    const { user }: TReadUsersResponse = await readUsersService.execute(
      createdUserResponse.createdUser.id
    )

    expect(user.id).toBe(updatedUser.id)
    expect(updateUserData.username).toBe(updatedUser.username)
  })

  it('should not be able to update if user does not found', async () => {
    const updateUserData: IExecuteParams = {
      id: '0',
      username: 'InSTinToS0'
    }

    expect(() =>
      updateUserService.execute(updateUserData)
    ).rejects.toBeInstanceOf(AppError)
  })

  it('it should not be able to change to an existing username', async () => {
    expect(
      updateUserService.execute({
        username: 'InSTinToS2',
        id: createdUserResponse.createdUser.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('it should not be able to change to an existing email', async () => {
    expect(
      updateUserService.execute({
        email: 'instintos2@instintos.com',
        id: createdUserResponse.createdUser.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
