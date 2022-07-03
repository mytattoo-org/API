import request from 'supertest'

import { app } from '@shared/routes'
import type { ISuperResponse } from '@shared/types/supertest'

import { TSignInResponse } from '@common/types/authentication/useCases/signIn.types'
import type { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'
import type { TReadUsersResponse } from '@common/types/users/useCases/readUsers.types'
import type { TUpdateUserResponse } from '@common/types/users/useCases/updateUser.types'

let createdUser: TCreateUserResponse['createdUser']

describe('UpdateUserController', () => {
  beforeEach(async () => {
    const response: ISuperResponse<TCreateUserResponse> = await request(app)
      .post('/users')
      .send({
        username: 'InSTinToS',
        password: 'Miguel@1234',
        email: 'instintos@instintos.com'
      })

    createdUser = response.body.createdUser
  })

  afterEach(async () => {
    await request(app).delete(`/users/${createdUser.id}`)
  })

  it('should be able to update username', async () => {
    const signInResponse: ISuperResponse<TSignInResponse> = await request(app)
      .post('/auth/sign-in')
      .send({ password: 'Miguel@1234', usernameOrEmail: createdUser.username })

    const updatedUserResponse: ISuperResponse<TUpdateUserResponse> =
      await request(app)
        .patch(`/users`)
        .send({ username: 'InSTinToS2', password: 'Miguel@1234' })
        .set({ Authorization: `Bearer ${signInResponse.body.token}` })

    const {
      body: { user }
    }: ISuperResponse<TReadUsersResponse> = await request(app).get(
      `/users/${createdUser.id}`
    )

    expect(user.id).toBe(updatedUserResponse.body.updatedUser.id)
    expect(user.username).toBe(updatedUserResponse.body.updatedUser.username)
  })

  it('should be able to update password', async () => {
    const signInResponse: ISuperResponse<TSignInResponse> = await request(app)
      .post('/auth/sign-in')
      .send({ password: 'Miguel@1234', usernameOrEmail: createdUser.username })

    const updatedUserResponse: ISuperResponse<TUpdateUserResponse> =
      await request(app)
        .patch(`/users`)
        .send({ password: 'Miguel@1234', newPassword: 'Miguel@12345' })
        .set({ Authorization: `Bearer ${signInResponse.body.token}` })

    const signInSecondResponse: ISuperResponse<TSignInResponse> = await request(
      app
    )
      .post('/auth/sign-in')
      .send({ password: 'Miguel@12345', usernameOrEmail: createdUser.username })

    expect(signInSecondResponse.body.id).toBe(
      updatedUserResponse.body.updatedUser.id
    )
  })
})
