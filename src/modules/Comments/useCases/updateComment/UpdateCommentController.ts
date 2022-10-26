import { container } from 'tsyringe'

import { UpdateCommentService } from './UpdateCommentService'
import { THandle } from './updateComment.types'

class UpdateCommentController {
  handle: THandle = async (req, res) => {
    const updateCommentService = container.resolve(UpdateCommentService)

    const response = await updateCommentService.execute({
      id: req.body.id,
      content: req.body.content
    })

    return res.json(response).status(200)
  }
}

export { UpdateCommentController }
