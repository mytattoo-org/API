import { CommentModel } from '../models/CommentModel'
import { ICommentsRepository } from './ICommentsRepository.types'

import { query } from '@shared/database'

import { ICommentUser } from '@common/types/comments/models/commentModel'

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

    await query(queryData)

    const createdComment = this.findById(id)

    return createdComment
  }

  findById: ICommentsRepository['findById'] = async (id: string) => {
    const queryData = `
      SELECT
        c.id,
        c.content,
        c.post_id,
        c.user_id,
        c.updated_at,
        c.created_at,
        u.avatar,
        u.username
      FROM "Comment" c
      INNER JOIN "User" u
      ON c.user_id = u.id
      WHERE c.id = '${id}'
      ORDER BY c.created_at
      DESC;
    `

    const comment = (await query<ICommentUser>(queryData)).rows[0]

    return comment
  }

  findByUserId: ICommentsRepository['findByUserId'] = async id => {
    const queryData = `
      SELECT
        c.id,
        c.content,
        c.post_id,
        c.user_id,
        c.updated_at,
        c.created_at,
        u.avatar,
        u.username
      FROM "Comment" c
      INNER JOIN "User" u
      ON c.user_id = u.id
      WHERE c.user_id = '${id}'
      ORDER BY c.created_at
      DESC;
    `

    const comments = (await query<ICommentUser>(queryData)).rows

    return comments
  }

  findByPostId: ICommentsRepository['findByPostId'] = async id => {
    const queryData = `
      SELECT
        c.id,
        c.content,
        c.post_id,
        c.user_id,
        c.updated_at,
        c.created_at,
        u.avatar,
        u.username
      FROM "Comment" c
      INNER JOIN "User" u
      ON c.user_id = u.id
      WHERE c.post_id = '${id}'
      ORDER BY c.created_at
      DESC;
    `

    const comments = (await query<ICommentUser>(queryData)).rows

    return comments
  }

  findByPostAndUserId: ICommentsRepository['findByPostAndUserId'] = async ({
    post_id: postId,
    user_id: userId
  }) => {
    const queryData = `
      SELECT
        c.id,
        c.content,
        c.post_id,
        c.user_id,
        c.updated_at,
        c.created_at,
        u.avatar,
        u.username
      FROM "Comment" c
      INNER JOIN "User" u
      ON c.user_id = u.id
      WHERE c.post_id = '${postId}'
      AND c.user_id = '${userId}'
      ORDER BY c.created_at
      DESC;
    `

    const comments = (await query<ICommentUser>(queryData)).rows

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
