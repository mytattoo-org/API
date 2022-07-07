import request from 'supertest'

import { ICreatePostResponse } from './CreatePost.types'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import { IUserModel } from '@common/types/users/models/userModel.types'
import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'

let userId: IUserModel['id']

describe('CreatePostController', () => {
  beforeEach(async () => {
    const createUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send({
        username: 'InSTinToS',
        password: 'Miguel@1234',
        email: 'instintos@instintos.com'
      })

    userId = createUserResponse.body.createdUser.id
  })

  afterEach(async () => {
    await request(app).delete(`/users/${userId}`)
  })

  it('should be able to create a new post', async () => {
    const dataToCreate = { image: 'any-image', user_id: userId }

    const response: ISuperResponse<ICreatePostResponse> = await request(app)
      .post('/posts')
      .send(dataToCreate)

    const { createdPost } = response.body

    expect({
      image: createdPost.image,
      user_id: userId
    }).toStrictEqual(dataToCreate)
  })
})
