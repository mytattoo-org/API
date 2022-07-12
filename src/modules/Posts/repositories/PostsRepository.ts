import { PostModel } from '../models/PostModel.'
import { IPostsRepository } from './IPostsRepository.types'

import { query } from '@shared/database'

import type { IFeedModel } from '@common/types/posts/models/feedModel.types'

class PostsRepository implements IPostsRepository {
  joinUsers: IPostsRepository['joinUsers'] = async () => {
    const queryData = `
      SELECT
        p.image,
          p.created_at,
          p.description,
          p.id,
          p.user_id,
          u.username,
          u.avatar,
          u.artist
      FROM Posts p
      INNER JOIN Users u
      ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `

    const postsJoinedWithUsers = (await query<IFeedModel>(queryData)).rows

    return postsJoinedWithUsers
  }

  delete: IPostsRepository['delete'] = async id => {
    const queryData = `DELETE FROM Posts WHERE id='${id}'`

    await query(queryData)
  }

  findById: IPostsRepository['findById'] = async id => {
    const queryData = `SELECT * FROM Posts WHERE id='${id}'`

    const post = (await query<PostModel>(queryData)).rows[0]

    return post
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
