import request from 'supertest'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import { TSignInResponse } from '@common/types/authentication/useCases/signIn.types'
import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'
import { TReadUsersResponse } from '@common/types/users/useCases/readUsers.types'

describe('ReadUserController', () => {
  it('should be able to read a user using id', async () => {
    const createdUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send({
        username: 'InSTinToS',
        password: 'Miguel@1234',
        email: 'instintos@instintos.com'
      })

    const createdUser = createdUserResponse.body.createdUser

    const readUserResponse: ISuperResponse<TReadUsersResponse> = await request(
      app
    ).get(`/users/${createdUser.id}`)

    expect(createdUser).toStrictEqual(readUserResponse.body.user)

    await request(app).delete(`/users/${createdUser.id}`)
  })

  it('should be able to read a user using token', async () => {
    const createdUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send({
        username: 'InSTinToS2',
        password: 'Miguel@1234',
        email: 'instintos2@instintos.com'
      })

    const createdUser = createdUserResponse.body.createdUser

    const signInResponse: ISuperResponse<TSignInResponse> = await request(app)
      .post('/auth/sign-in')
      .send({ usernameOrEmail: createdUser.username, password: 'Miguel@1234' })

    const readUserResponse: ISuperResponse<TReadUsersResponse> = await request(
      app
    )
      .get(`/user`)
      .set({ Authorization: `Bearer ${signInResponse.body.token}` })

    expect(createdUser).toStrictEqual(readUserResponse.body.user)

    await request(app).delete(`/users/${createdUser.id}`)
  })

  it('should be able to read all users', async () => {
    const createdUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send({
        username: 'InSTinToS',
        password: 'Miguel@1234',
        email: 'instintos@instintos.com'
      })

    const createdSecondUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send({
        username: 'InSTinToS2',
        password: 'Miguel@1234',
        email: 'instintos2@instintos.com'
      })

    const createdUser = createdUserResponse.body.createdUser
    const createdSecondUser = createdSecondUserResponse.body.createdUser

    const readUserResponse: ISuperResponse<TReadUsersResponse> = await request(
      app
    ).get('/users')

    expect([createdUser, createdSecondUser]).toStrictEqual(
      readUserResponse.body.users
    )

    await request(app).delete(`/users/${createdUser.id}`)
    await request(app).delete(`/users/${createdSecondUser.id}`)
  })
})
