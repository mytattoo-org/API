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
      FROM "Post" p
      INNER JOIN "User" u
      ON p.user_id = u.id
      ORDER BY p.created_at
      DESC;
    `

    const postsJoinedWithUsers = (await query<IFeedModel>(queryData)).rows

    return postsJoinedWithUsers
  }

  delete: IPostsRepository['delete'] = async id => {
    const queryData = `DELETE FROM "Post" WHERE "id"='${id}';`

    await query(queryData)
  }

  findById: IPostsRepository['findById'] = async id => {
    const queryData = `SELECT * FROM "Post" WHERE "id"='${id}';`

    const post = (await query<PostModel>(queryData)).rows[0]

    return post
  }

  findAll: IPostsRepository['findAll'] = async () => {
    const queryData = 'SELECT * FROM "Post";'

    const allPosts = (await query<PostModel>(queryData)).rows

    return allPosts
  }

  create: IPostsRepository['create'] = async ({
    id,
    image,
    description,
    user_id: userId,
    created_at: createdAt,
    updated_at: updatedAt
  }) => {
    const queryData = `
      INSERT INTO "Post" (
        "id",
        "image",
        "user_id",
        "created_at",
        "updated_at",
        "description"
      ) VALUES (
        '${id}',
        '${image}',
        '${userId}',
        '${createdAt}',
        '${updatedAt}',
        '${description}'
      ) RETURNING *;
    `

    const createdPost = (await query<PostModel>(queryData)).rows[0]

    return createdPost
  }
}

export { PostsRepository }
