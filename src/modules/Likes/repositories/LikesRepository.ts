import { LikeModel } from '../models/LikeModel'
import { ILikesRepository } from './ILikesRepository.types'

import { query } from '@shared/database'

class LikesRepository implements ILikesRepository {
  findByUserAndPostId: ILikesRepository['findByUserAndPostId'] = async ({
    post_id: postId,
    user_id: userId
  }) => {
    const queryData = `
      SELECT * FROM "Like"
      WHERE "user_id"='${userId}'
      AND "post_id"='${postId}';
    `

    const like = (await query<LikeModel>(queryData)).rows[0]

    return like
  }

  findByUserId: ILikesRepository['findByUserId'] = async id => {
    const queryData = `SELECT * FROM "Like" WHERE "user_id"='${id}';`

    const likes = (await query<LikeModel>(queryData)).rows

    return likes
  }

  findByPostId: ILikesRepository['findByPostId'] = async id => {
    const queryData = `SELECT * FROM "Like" WHERE "post_id"='${id}';`

    const likes = (await query<LikeModel>(queryData)).rows

    return likes
  }

  delete: ILikesRepository['delete'] = async ({
    post_id: postId,
    user_id: userId
  }) => {
    const queryData = `
      DELETE FROM "Like"
      WHERE "user_id"='${userId}'
      AND "post_id"='${postId}';
    `

    await query(queryData)
  }

  create: ILikesRepository['create'] = async ({
    post_id: postId,
    user_id: userId
  }) => {
    const queryData = `
      INSERT INTO "Like" (
        "user_id",
        "post_id"
      ) VALUES (
       '${userId}',
       '${postId}'
      ) RETURNING *;
    `

    const res = await query<LikeModel>(queryData)

    return res.rows[0]
  }
}

export { LikesRepository }
