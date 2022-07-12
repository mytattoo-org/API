import request from 'supertest'

import { app } from '@shared/routes'
import { ISuperResponse } from '@shared/types/supertest'

import { IPostModel } from '@common/types/posts/models/postModel.types'
import { TCreatePostResponse } from '@common/types/posts/useCases/createPost.types'
import { TFeedResponse } from '@common/types/posts/useCases/readFeed.types'
import { IUser, IUserModel } from '@common/types/users/models/userModel.types'
import { TCreateUserResponse } from '@common/types/users/useCases/createUser.types'

let user: IUser
let postId: IPostModel['id']

describe('ReadFeedController', () => {
  beforeEach(async () => {
    const createUserResponse: ISuperResponse<TCreateUserResponse> =
      await request(app).post('/users').send({
        username: 'InSTinToS',
        password: 'Miguel@1234',
        email: 'instintos@instintos.com'
      })

    user = createUserResponse.body.createdUser
  })

  afterEach(async () => {
    await request(app).delete(`/users/${user.id}`)
    await request(app).delete(`/posts/${postId}`)
  })

  it('should be able to read feed posts', async () => {
    const dataToCreate = {
      user_id: user.id,
      image: 'any-image',
      description: 'any-description'
    }

    const response: ISuperResponse<TCreatePostResponse> = await request(app)
      .post('/posts')
      .send(dataToCreate)

    const {
      body: { posts }
    }: ISuperResponse<TFeedResponse> = await request(app).get(`/feed`)

    expect(posts).toStrictEqual([
      {
        author: {
          id: user.id,
          artist: user.artist,
          username: user.username
        },
        image: dataToCreate.image,
        id: response.body.createdPost.id,
        description: dataToCreate.description,
        created_at: response.body.createdPost.created_at
      }
    ])

    postId = response.body.createdPost.id
  })
})
