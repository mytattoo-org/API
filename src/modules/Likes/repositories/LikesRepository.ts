import { LikeModel } from '../models/LikeModel'
import { ILikesRepository } from './ILikesRepository.types'

import { query } from '@shared/database'

class LikesRepository implements ILikesRepository {
  findById: ILikesRepository['findById'] = async (id: string) => {
    const queryData = `SELECT * FROM Likes WHERE id='${id}'`

    const like = (await query<LikeModel>(queryData)).rows[0]

    return like
  }

  findByUserId: ILikesRepository['findByUserId'] = async id => {
    const queryData = `SELECT * FROM Likes WHERE user_id='${id}'`

    const like = (await query<LikeModel>(queryData)).rows

    return like
  }

  findByPostId: ILikesRepository['findByPostId'] = async id => {
    const queryData = `SELECT * FROM Likes WHERE post_id='${id}'`

    const like = (await query<LikeModel>(queryData)).rows

    return like
  }

  delete: ILikesRepository['delete'] = async id => {
    const queryData = `DELETE FROM Likes WHERE id='${id}'`

    await query(queryData)
  }

  create: ILikesRepository['create'] = async ({ id, post_id, user_id }) => {
    const queryData = `
      INSERT INTO Likes (
        id,
        user_id,
        post_id
      ) VALUES (
        '${id}',
        '${user_id}',
        '${post_id}'
      );
    `

    await query<LikeModel>(queryData)

    const createdLike = await this.findById(id)

    return createdLike
  }
}

export { LikesRepository }
