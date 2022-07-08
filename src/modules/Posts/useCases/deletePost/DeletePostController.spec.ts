import request from 'supertest'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import { TCreatePostResponse } from '@common/types/posts/useCases/createPost.types'
import { IUserModel } from '@common/types/users/models/userModel.types'
import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'

let userId: IUserModel['id']

describe('ReadPostController', () => {
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

  it('should be able to delete a single post', async () => {
    const dataToCreate = { image: 'any-image', user_id: userId }

    const response: ISuperResponse<TCreatePostResponse> = await request(app)
      .post('/posts')
      .send(dataToCreate)

    await request(app).delete(`/posts/${response.body.createdPost.id}`)

    const {
      body: { post }
    }: ISuperResponse<any> = await request(app).get(
      `/posts/${response.body.createdPost.id}`
    )

    expect(post).toBeFalsy()
  })
})
