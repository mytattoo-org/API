import { Client } from 'pg'
import request from 'supertest'

import { connectToTestsDB } from '@config/connectToDB'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import { TCreateUserResponse } from '@common/types/users/createUser.types'
import { TDeleteUserResponse } from '@common/types/users/deleteUser.types'
import { TReadUsersResponse } from '@common/types/users/readUsers.types'

let dbConnection: Client

describe.skip('DeleteUserController', () => {
  beforeAll(async () => {
    dbConnection = await connectToTestsDB()
  })

  afterAll(async () => {
    await dbConnection.end()
  })

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

    expect(foundDeletedUser.body.user).toBe(undefined)
  })

  it('should not be able to delete a non-existing user', async () => {
    const deletedResponse: ISuperResponse<TDeleteUserResponse> = await request(
      app
    ).delete('/users/0')

    expect(deletedResponse.body.error).toBe('User does not exist')
  })
})
