import { bufferToB64 } from '@shared/utils/b64'

import {
  ICommentUser,
  ICommentUserModel
} from '@common/types/comments/models/commentUserModel'

export const formatComment = ({
  user_id,
  username,
  ...comment
}: ICommentUserModel): ICommentUser => ({
  ...comment,
  author: { avatar: bufferToB64(comment.avatar), username, id: user_id }
})

export const formatComments = (comments: ICommentUserModel[]): ICommentUser[] =>
  comments.map(formatComment)
