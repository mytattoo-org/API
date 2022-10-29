import { CommentModel } from '../models/CommentModel'
import { ICommentsRepository } from './ICommentsRepository.types'

import { query } from '@shared/database'

class CommentsRepository implements ICommentsRepository {
  create: ICommentsRepository['create'] = async ({
    id,
    post_id,
    user_id,
    content,
    updated_at,
    created_at
  }) => {
    const queryData = `
      INSERT INTO "Comment" (
        "id",
        "user_id",
        "post_id",
        "content",
        "updated_at",
        "created_at"
      ) VALUES (
        '${id}',
        '${user_id}',
        '${post_id}',
        '${content}',
        '${updated_at}',
        '${created_at}'
      ) RETURNING *;
    `

    const createdComment = (await query<CommentModel>(queryData)).rows[0]

    return createdComment
  }

  findById: ICommentsRepository['findById'] = async (id: string) => {
    const queryData = `SELECT * FROM "Comment" WHERE "id"='${id}';`

    const comment = (await query<CommentModel>(queryData)).rows[0]

    return comment
  }

  findByUserId: ICommentsRepository['findByUserId'] = async id => {
    const queryData = `SELECT * FROM "Comment" WHERE "user_id"='${id}';`

    const comments = (await query<CommentModel>(queryData)).rows

    return comments
  }

  findByPostId: ICommentsRepository['findByPostId'] = async id => {
    const queryData = `SELECT * FROM "Comment" WHERE "post_id"='${id}';`

    const comments = (await query<CommentModel>(queryData)).rows

    return comments
  }

  findByPostAndUserId: ICommentsRepository['findByPostAndUserId'] = async ({
    post_id: postId,
    user_id: userId
  }) => {
    const queryData = `
      SELECT * FROM "Comment"
      WHERE "user_id"='${userId}'
      AND "post_id"='${postId}';
    `

    const comments = (await query<CommentModel>(queryData)).rows

    return comments
  }

  update: ICommentsRepository['update'] = async data => {
    const updatedDate = new Date().toISOString()

    await query<CommentModel>(`
        UPDATE
          "Comment"
        SET
          "content" = '${data.content}',
          "updated_at" = '${updatedDate}'
        WHERE
          "id" = '${data.id}';
      `)

    const updatedComment = await this.findById(data.id)

    return updatedComment
  }

  delete: ICommentsRepository['delete'] = async id => {
    const queryData = `DELETE FROM "Comment" WHERE "id"='${id}';`

    await query(queryData)
  }
}

export { CommentsRepository }
