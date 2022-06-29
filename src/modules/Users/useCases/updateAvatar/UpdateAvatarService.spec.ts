import { CreateUserService } from '../createUser/CreateUserService'
import { ReadUsersService } from '../readUsers/ReadUsersService'
import { UpdateAvatarService } from './UpdateAvatarService'

import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'

import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'

let createUserService: CreateUserService
let usersRepository: UsersRepositoryInMemory
let updateAvatarService: UpdateAvatarService
let createdUserResponse: TCreateUserResponse

describe('UpdateAvatarService', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    createUserService = new CreateUserService(usersRepository)
    updateAvatarService = new UpdateAvatarService(usersRepository)
    createdUserResponse = await createUserService.execute({
      email: 'instintos@instintos',
      password: 'Miguel@1234',
      username: 'InSTinToS'
    })
  })

  it('should be able to add avatar', async () => {
    const userId = createdUserResponse.createdUser.id
    const filename = 'test'

    const { updatedUser } = await updateAvatarService.execute({
      filename,
      id: userId
    })

    expect(updatedUser.avatar).toBe(filename)
  })
})
