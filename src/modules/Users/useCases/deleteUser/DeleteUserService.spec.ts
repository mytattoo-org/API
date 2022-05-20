import { DeleteUserService } from './DeleteUserService'

import { UsersRepository } from '@modules/Users/repositories/User/UserRepository'
import { UsersRepositoryInMemory } from '@modules/Users/repositories/User/UserRepositoryInMemory'

let usersRepository: UsersRepository
let deleteUserService: DeleteUserService

describe('DeleteUserService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    deleteUserService = new DeleteUserService(usersRepository)
  })

  it('should be able to delete a user', async () => {
    const dataToCreate = {
      id: '1',
      updated_at: '1',
      created_at: '1',
      email: 'm@m.com',
      username: 'InSTinToS',
      password: 'Miguel@1234'
    }

    await usersRepository.create(dataToCreate)

    const { deletedUser } = await deleteUserService.execute(dataToCreate.id)

    const foundUser = await usersRepository.findById(dataToCreate.id)

    expect(foundUser).toBe(undefined)
    expect(deletedUser).toMatchObject(dataToCreate)
  })
})
