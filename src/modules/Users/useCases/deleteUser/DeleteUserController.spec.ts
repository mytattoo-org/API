import request from 'supertest'

import { AppError } from '@modules/Error/models/AppError'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'
import { TDeleteUserResponse } from '@common/types/users/useCases/deleteUser.types'
import { TReadUsersResponse } from '@common/types/users/useCases/readUsers.types'

describe('DeleteUserController', () => {
  it('should be able to delete a user', async () => {
    const userToCreate = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    const createdResponse: ISuperResponse<TCreateUserResponse> = await request(
      app
    )
      .post('/users')
      .send(userToCreate)

    const deletedResponse: ISuperResponse<TDeleteUserResponse> = await request(
      app
    ).delete(`/users/${createdResponse.body.createdUser.id}`)

    const foundDeletedUser: ISuperResponse<TReadUsersResponse> = await request(
      app
    ).get(`/users/${deletedResponse.body.deletedUser.id}`)

    expect(foundDeletedUser.body.user).toStrictEqual({})
  })

  it('should not be able to delete a non-existing user', async () => {
    const { statusCode } = await request(app).delete('/users/312a')

    expect(statusCode).toBe(400)
  })
})
