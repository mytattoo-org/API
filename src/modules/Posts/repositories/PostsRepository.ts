import { PostModel } from '../models/PostModel.'
import { IPostsRepository } from './IPostsRepository.types'

import { query } from '@shared/database'

import { IPostModel } from '@common/types/posts/models/postModel.types'

class PostsRepository implements IPostsRepository {
  update: (data: Partial<IPostModel>) => Promise<IPostModel>

  delete: IPostsRepository['delete'] = async id => {
    const queryData = `DELETE FROM Posts WHERE id='${id}'`

    await query(queryData)
  }

  findById: IPostsRepository['findById'] = async id => {
    const queryData = `SELECT * FROM Posts WHERE id='${id}'`

    const allPosts = (await query<PostModel>(queryData)).rows[0]

    return allPosts
  }

  findAll: IPostsRepository['findAll'] = async () => {
    const queryData = 'SELECT * FROM Posts'

    const allPosts = (await query<PostModel>(queryData)).rows

    return allPosts
  }

  create: IPostsRepository['create'] = async ({
    id,
    image,
    user_id,
    description,
    created_at,
    updated_at
  }) => {
    const queryData = `
      INSERT INTO Posts (
        id,
        image,
        user_id,
        created_at,
        updated_at,
        description
      ) VALUES (
        '${id}',
        '${image}',
        '${user_id}',
        '${created_at}',
        '${updated_at}',
        '${description}'
      );
    `

    await query<PostModel>(queryData)

    const createdPost = await this.findById(id)

    return createdPost
  }
}

export { PostsRepository }
