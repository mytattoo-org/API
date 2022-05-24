import { CreateUserService } from '../createUser/CreateUserService'
import { ReadUsersService } from '../readUsers/ReadUsersService'
import { UpdateUserService } from './UpdateUserService'

import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'

import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'
import { TReadUsersResponse } from '@common/types/users/useCases/readUsers.types'

describe('UpdateUserService', () => {
  it('should be able to update username', async () => {
    const usersRepository = new UsersRepositoryInMemory()
    const readUsersService = new ReadUsersService(usersRepository)
    const createUserService = new CreateUserService(usersRepository)
    const updateUserService = new UpdateUserService(usersRepository)

    const { createdUser }: TCreateUserResponse =
      await createUserService.execute({
        username: 'InSTinToS',
        password: 'InSTinToS@1234',
        email: 'instintos@instintos.com'
      })

    const { updatedUser } = await updateUserService.execute({
      username: 'InSTinToS2',
      id: createdUser.id
    })

    const { user }: TReadUsersResponse = await readUsersService.execute(
      createdUser.id
    )

    expect(user.id).toBe(updatedUser.id)
    expect(user.username).toBe(updatedUser.username)
  })
})
