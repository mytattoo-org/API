import request from 'supertest'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import type { IPostModel } from '@common/types/posts/models/PostModel.types'
import type { TCreatePostResponse } from '@common/types/posts/useCases/createPost.types'
import type { IUserModel } from '@common/types/users/models/userModel.types'
import type { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'

let userId: IUserModel['id']
let postId: IPostModel['id']

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
    await request(app).delete(`/posts/${postId}`)
  })

  it('should be able to create a new post', async () => {
    const dataToCreate = { image: 'any-image', user_id: userId }

    const response: ISuperResponse<TCreatePostResponse> = await request(app)
      .post('/posts')
      .send(dataToCreate)

    const { createdPost } = response.body

    expect({ user_id: userId, image: createdPost.image }).toStrictEqual(
      dataToCreate
    )

    postId = createdPost.id
  })
})
