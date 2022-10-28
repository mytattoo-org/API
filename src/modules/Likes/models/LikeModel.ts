import { ILikeModel } from '@common/types/likes/models/likeModel.types'

class LikeModel implements ILikeModel {
  user_id: string
  post_id: string
}

export { LikeModel }
