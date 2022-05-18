import { Client } from 'pg'
import request from 'supertest'

import { connectToTestsDB } from '@config/connectToDB'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import type {
  ICreateUserRequest,
  TCreateUserResponse
} from '@common/types/users/createUser.types'

let dbConnection: Client
let response: ISuperResponse<TCreateUserResponse>

const createUserData: ICreateUserRequest = {
  username: 'InSTinToS',
  password: 'Miguel@1234',
  email: 'instintos@instintos.com'
}

describe.skip('CreateUserController', () => {
  beforeAll(async () => {
    dbConnection = await connectToTestsDB()
  })

  afterAll(async () => {
    await dbConnection.end()
  })

  beforeEach(async () => {
    response = await request(app).post('/users').send(createUserData)
  })

  afterEach(async () => {
    await request(app).delete(`/users/${response.body.createdUser.id}`)
  })

  it('should be able to create a user', async () => {
    expect(response.statusCode).toBe(201)
    expect(response.body.createdUser.email).toBe(createUserData.email)
    expect(response.body.createdUser.username).toBe(createUserData.username)
  })

  it('should not be able to create a user if email already exists', async () => {
    const createSecondUserData: ICreateUserRequest = {
      username: 'InSTinToS2',
      password: 'Miguel@1234',
      email: 'instintos@instintos.com'
    }

    const responseCreateSecondUser: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send(createSecondUserData)

    expect(responseCreateSecondUser.statusCode).toBe(400)
    expect(responseCreateSecondUser.body.error).toBe('E-mail already exists')
  })

  it('should not be able to create a user if username already exists', async () => {
    const createSecondUserData: ICreateUserRequest = {
      username: 'InSTinToS',
      password: 'Miguel@1234',
      email: 'instintos2@instintos.com'
    }

    const response: ISuperResponse<TCreateUserResponse> = await request(app)
      .post('/users')
      .send(createSecondUserData)

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('Username already exists')
  })
})
