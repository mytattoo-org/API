import { CommentModel } from '../models/CommentModel'
import { ICommentsRepository } from './ICommentsRepository.types'

import { query } from '@shared/database'

class CommentsRepository implements ICommentsRepository {
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

  findById: ICommentsRepository['findById'] = async (id: string) => {
    const queryData = `SELECT * FROM "Comment" WHERE "id"='${id}';`

    const comment = (await query<CommentModel>(queryData)).rows[0]

    return comment
  }

  findByUserId: ICommentsRepository['findByUserId'] = async id => {
    const queryData = `SELECT * FROM "Comment" WHERE "user_id"='${id}';`

    const comment = (await query<CommentModel>(queryData)).rows

    return comment
  }

  findByPostId: ICommentsRepository['findByPostId'] = async id => {
    const queryData = `SELECT * FROM "Comment" WHERE "post_id"='${id}';`

    const comment = (await query<CommentModel>(queryData)).rows

    return comment
  }

  delete: ICommentsRepository['delete'] = async id => {
    const queryData = `DELETE FROM "Comment" WHERE "id"='${id}';`

    await query(queryData)
  }

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
      );
    `

    await query<CommentModel>(queryData)

    const createdComment = await this.findById(id)

    return createdComment
  }
}

export { CommentsRepository }
