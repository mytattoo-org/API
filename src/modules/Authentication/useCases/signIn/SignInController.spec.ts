import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import { connectToDB } from '@config/connectToDB'

import { TCreateUserResponse } from '@common/types/users/createUser.types'

import { Client } from 'pg'
import request from 'supertest'

import type { TSignInResponse } from '@common/types/authentication/signIn.types'
let dbConnection: Client
describe('SignInController', () => {
  beforeAll(async () => {
    dbConnection = await connectToDB()
  })

  afterAll(async () => {
    await dbConnection.end()
  })

  it('should be able to be authenticated', async () => {
    const createUserData = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    const createUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send(createUserData)

    const signInResponse: ISuperResponse<TSignInResponse> = await request(app)
      .post('/auth/sign-in')
      .send({
        usernameOrEmail: createUserData.username,
        password: createUserData.password
      })

    expect(signInResponse.body).toHaveProperty('token')
    expect(signInResponse.body.id).toBe(createUserResponse.body.createdUser.id)

    await request(app).delete(
      `/users/${createUserResponse.body.createdUser.id}`
    )
  })
})
