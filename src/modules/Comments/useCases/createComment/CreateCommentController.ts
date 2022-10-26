import { container } from 'tsyringe'

import { THandle } from './CreateComment.types'
import { CreateCommentService } from './CreateCommentService'

class CreateCommentController {
  handle: THandle = async (req, res) => {
    const createCommentService = container.resolve(CreateCommentService)

    const response = await createCommentService.execute({
      ...req.body,
      user_id: res.locals.user.id
    })

    return res.json(response).status(201)
  }
}

export { CreateCommentController }
