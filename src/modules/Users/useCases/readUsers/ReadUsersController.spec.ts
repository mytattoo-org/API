import request from 'supertest'

import { app } from '@shared/routes'
import type { ISuperResponse } from '@shared/types/supertest'

import type { TSignInResponse } from '@common/types/authentication/useCases/signIn.types'
import type { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'
import type { TReadUsersResponse } from '@common/types/users/useCases/readUsers.types'

let createdUser: TCreateUserResponse['createdUser']

describe('ReadUserController', () => {
  beforeEach(async () => {
    const createdUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send({
        username: 'InSTinToS',
        password: 'Miguel@1234',
        email: 'instintos@instintos.com'
      })

    createdUser = createdUserResponse.body.createdUser
  })

  afterEach(async () => {
    await request(app).delete(`/users/${createdUser.id}`)
  })

  it('should be able to read a user using id', async () => {
    const readUserResponse: ISuperResponse<TReadUsersResponse> = await request(
      app
    ).get(`/users/${createdUser.id}`)

    expect(createdUser).toStrictEqual(readUserResponse.body.user)
  })

  it('should be able to read a user using token', async () => {
    const signInResponse: ISuperResponse<TSignInResponse> = await request(app)
      .post('/auth/sign-in')
      .send({ password: 'Miguel@1234', usernameOrEmail: createdUser.username })

    const readUserResponse: ISuperResponse<TReadUsersResponse> = await request(
      app
    )
      .get(`/user`)
      .set({ Authorization: `Bearer ${signInResponse.body.token}` })

    expect(createdUser).toStrictEqual(readUserResponse.body.user)
  })

  it('should not be able to read a user with invalid token', async () => {
    await request(app).post('/auth/sign-in').send({
      password: 'Miguel@1234',
      usernameOrEmail: createdUser.username
    })

    const readUserResponse: ISuperResponse<TReadUsersResponse> = await request(
      app
    )
      .get(`/user`)
      .set({ Authorization: `invalidToken` })

    expect(readUserResponse.body.error).toBe('Invalid token')
  })

  it('should be able to read all users', async () => {
    const createdSecondUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send({
        username: 'InSTinToS2',
        password: 'Miguel@1234',
        email: 'instintos2@instintos.com'
      })

    const createdSecondUser = createdSecondUserResponse.body.createdUser

    const readUserResponse: ISuperResponse<TReadUsersResponse> = await request(
      app
    ).get('/users')

    expect([createdUser, createdSecondUser]).toStrictEqual(
      readUserResponse.body.users
    )

    await request(app).delete(`/users/${createdSecondUser.id}`)
  })
})
