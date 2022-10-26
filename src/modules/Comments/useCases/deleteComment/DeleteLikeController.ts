import { container } from 'tsyringe'

import { THandle } from './DeleteComment.types'
import { DeleteCommentService } from './DeleteCommentService'

class DeleteCommentController {
  handle: THandle = async (req, res) => {
    const deleteCommentService = container.resolve(DeleteCommentService)

    const response = await deleteCommentService.execute(req.params.id)

    return res.json(response).status(200)
  }
}

export { DeleteCommentController }
