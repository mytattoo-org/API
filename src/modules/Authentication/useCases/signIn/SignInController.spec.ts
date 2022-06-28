import request from 'supertest'

import { AppError } from '@modules/Error/models/AppError'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import type { TSignInResponse } from '@common/types/authentication/useCases/signIn.types'
import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'

const createUserData = {
  username: 'InSTinToS',
  password: 'Miguel@1234',
  email: 'instintos@instintos.com'
}

let createdUserId: string

describe('SignInController', () => {
  beforeEach(async () => {
    const createUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send(createUserData)

    createdUserId = createUserResponse.body.createdUser.id
  })

  afterEach(async () => {
    await request(app).delete(`/users/${createdUserId}`)
  })

  it('should be able to be authenticated', async () => {
    const signInResponse: ISuperResponse<TSignInResponse> = await request(app)
      .post('/auth/sign-in')
      .send({
        password: createUserData.password,
        usernameOrEmail: createUserData.username
      })

    expect(signInResponse.body).toHaveProperty('token')
    expect(signInResponse.body.id).toBe(createdUserId)
  })

  it('should not be able to be authenticated if password is invalid', async () => {
    const signInResponse: ISuperResponse<TSignInResponse> = await request(app)
      .post('/auth/sign-in')
      .send({ password: 'Error', usernameOrEmail: createUserData.email })

    expect(signInResponse.body.error).toBe('Invalid email or password')
  })

  it('should not be able to be authenticated if usernameOrPassword invalid', async () => {
    const signInResponse: ISuperResponse<TSignInResponse> = await request(app)
      .post('/auth/sign-in')
      .send({ password: createUserData.password, usernameOrEmail: 'Error' })

    expect(signInResponse.body.error).toBe('Invalid email or password')
  })
})
