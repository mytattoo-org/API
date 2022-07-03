import { CreateUserService } from '../createUser/CreateUserService'
import { DeleteUserService } from '../deleteUser/DeleteUserService'
import { ReadUsersService } from '../readUsers/ReadUsersService'
import { UpdateUserService } from './UpdateUserService'

import type { IUsersRepository } from '@modules/Users/repositories/User/IUserRepository.types'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'

import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'
import type { TReadUsersResponse } from '@common/types/users/useCases/readUsers.types'
import { TUpdateUserResponse } from '@common/types/users/useCases/updateUser.types'

let usersRepository: IUsersRepository
let createUserService: CreateUserService
let updateUserService: UpdateUserService
let deleteUserService: DeleteUserService
let createdUser: TCreateUserResponse['createdUser']

describe('UpdateUserService', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    createUserService = new CreateUserService(usersRepository)
    updateUserService = new UpdateUserService(usersRepository)

    createdUser = (
      await createUserService.execute({
        username: 'InSTinToS',
        password: 'InSTinToS@1234',
        email: 'instintos@instintos.com'
      })
    ).createdUser
  })

  afterEach(async () => {
    deleteUserService = new DeleteUserService(usersRepository)

    deleteUserService.execute(createdUser.id)
  })

  it('should be able to update username and avatar', async () => {
    const readUsersService = new ReadUsersService(usersRepository)

    const { updatedUser } = await updateUserService.execute({
      avatar: 'avatar',
      id: createdUser.id,
      username: 'InSTinToS3',
      password: 'InSTinToS@1234'
    })

    const { user }: TReadUsersResponse = await readUsersService.execute(
      createdUser.id
    )

    expect(user.id).toBe(updatedUser.id)
    expect('InSTinToS3').toBe(updatedUser.username)
  })

  it('should not be able to update if user does not found', async () => {
    try {
      const { error }: TUpdateUserResponse = await updateUserService.execute({
        id: '0',
        username: 'InSTinToS10',
        password: 'InSTinToS@1234'
      })

      expect(error).toBeTruthy()
    } catch (error) {
      expect(error.message).toBe('User not found')
    }
  })

  it('should not be able to update without password', async () => {
    try {
      const { error }: TUpdateUserResponse = await updateUserService.execute({
        id: createdUser.id,
        username: 'InSTinToS10'
      })

      expect(error).toBeTruthy()
    } catch (error) {
      expect(error.message).toBe('Missing password')
    }
  })

  it('should not be able to update if password is invalid', async () => {
    try {
      const { error }: TUpdateUserResponse = await updateUserService.execute({
        id: createdUser.id,
        username: 'InSTinToS10',
        password: 'InSTinToS@12345'
      })

      expect(error).toBeTruthy()
    } catch (error) {
      expect(error.message).toBe('Invalid password')
    }
  })

  it('it should not be able to change to an existing username', async () => {
    try {
      const { error }: TUpdateUserResponse = await updateUserService.execute({
        id: createdUser.id,
        username: 'instintos',
        password: 'InSTinToS@1234'
      })

      expect(error).toBeTruthy()
    } catch (error) {
      expect(error.message).toBe('Username already exists')
    }
  })

  it('it should not be able to change to an existing email', async () => {
    try {
      const { error }: TUpdateUserResponse = await updateUserService.execute({
        id: createdUser.id,
        password: 'InSTinToS@1234',
        email: 'instintos@instintos.com'
      })

      expect(error).toBeTruthy()
    } catch (error) {
      expect(error.message).toBe('Email already exists')
    }
  })
})
