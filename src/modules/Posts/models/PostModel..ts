import { v4 as uuid } from 'uuid'

import type { IPostModel } from '@common/types/posts/models/postModel.types'

class PostModel implements IPostModel {
  id: string
  image: Buffer
  user_id: string
  created_at: string
  updated_at: string
  description?: string

  constructor() {
    this.id = this.id ?? uuid()
    this.created_at = this.created_at ?? new Date().toISOString()
    this.updated_at = this.updated_at ?? new Date().toISOString()
  }
}

export { PostModel }
