import { CommentModel } from '../models/CommentModel'
import { ICommentsRepository } from './ICommentsRepository.types'

import { query } from '@shared/database'

import { ICommentModel } from '@common/types/comments/models/commentModel'
import { ICommentUserModel } from '@common/types/comments/models/commentUserModel'

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
      );
    `

    await query<ICommentModel>(queryData)

    const createdComment = await this.findById(id)

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

    const foundComment = (await query<ICommentUserModel>(queryData)).rows[0]

    return foundComment
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

    const foundComments = (await query<ICommentUserModel>(queryData)).rows

    return foundComments
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

    const foundComments = (await query<ICommentUserModel>(queryData)).rows

    return foundComments
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

    const foundComments = (await query<ICommentUserModel>(queryData)).rows

    return foundComments
  }

  update: ICommentsRepository['update'] = async data => {
    const updatedDate = new Date().toISOString()

    const queryData = `
        UPDATE
          "Comment"
        SET
          "content" = '${data.content}',
          "updated_at" = '${updatedDate}'
        WHERE
          "id" = '${data.id}'
        RETURNING *;
      `

    const updatedComment = (await query<CommentModel>(queryData)).rows[0]

    return updatedComment
  }

  delete: ICommentsRepository['delete'] = async id => {
    const queryData = `DELETE FROM "Comment" WHERE "id"='${id}';`

    await query(queryData)
  }
}

export { CommentsRepository }
