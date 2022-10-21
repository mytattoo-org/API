import { v4 as uuid } from 'uuid'

import { ILikeModel } from '@common/types/likes/models/likeModel.types'

class LikeModel implements ILikeModel {
  id: string
  user_id: string
  post_id: string

  constructor() {
    this.id = this.id ?? uuid()
  }
}

export { LikeModel }
