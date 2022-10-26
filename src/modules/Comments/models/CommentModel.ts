import { v4 as uuid } from 'uuid'

import { ICommentModel } from '@common/types/comments/models/commentModel'

class CommentModel implements ICommentModel {
  id: string
  user_id: string
  post_id: string

  content: string
  created_at: string
  updated_at: string

  constructor() {
    this.id = this.id ?? uuid()
    this.created_at = this.created_at ?? new Date().toISOString()
    this.updated_at = this.updated_at ?? new Date().toISOString()
  }
}

export { CommentModel }
