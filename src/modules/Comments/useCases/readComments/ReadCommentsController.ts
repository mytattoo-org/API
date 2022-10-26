import { container } from 'tsyringe'

import { ReadCommentsService } from './ReadCommentsService'
import { THandle } from './readComments.types'

class ReadCommentController {
  handle: THandle = async (req, res) => {
    const readCommentsService = container.resolve(ReadCommentsService)

    const response = await readCommentsService.execute({
      post_id: req.body.post_id,
      user_id: req.body.user_id
    })

    return res.json(response).status(200)
  }
}

export { ReadCommentController }
