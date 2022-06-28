import request from 'supertest'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import {
  ICreateUserRequest,
  TCreateUserResponse
} from '@common/types/users/useCases/createUser.types'
import { TReadUsersResponse } from '@common/types/users/useCases/readUsers.types'
import {
  IUpdateUserRequest,
  TUpdateUserResponse
} from '@common/types/users/useCases/updateUser.types'

let response: ISuperResponse<TCreateUserResponse>

const createUserData: ICreateUserRequest = {
  username: 'InSTinToS',
  password: 'Miguel@1234',
  email: 'instintos@instintos.com'
}
describe('UpdateUserController', () => {
  beforeEach(async () => {
    response = await request(app).post('/users').send(createUserData)
  })

  afterEach(async () => {
    await request(app).delete(`/users/${response.body.createdUser.id}`)
  })
  it('should be able to update username', async () => {
    const updateUserData: IUpdateUserRequest = { username: 'InSTinToS2' }

    const {
      body: { updatedUser }
    }: ISuperResponse<TUpdateUserResponse> = await request(app)
      .patch(`/users/${response.body.createdUser.id}`)
      .send(updateUserData)

    const {
      body: { user }
    }: ISuperResponse<TReadUsersResponse> = await request(app).get(
      `/users/${response.body.createdUser.id}`
    )

    expect(user.id).toBe(updatedUser.id)
    expect(user.username).toBe(updatedUser.username)
  })
})
