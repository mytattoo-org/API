import { container } from 'tsyringe'

import { THandle } from './CreateLike.types'
import { CreateLikeService } from './CreateLikeService'

class CreateLikeController {
  handle: THandle = async (req, res) => {
    const createLikeService = container.resolve(CreateLikeService)

    const response = await createLikeService.execute({
      ...req.body,
      user_id: res.locals.user.id
    })

    return res.json(response).status(201)
  }
}

export { CreateLikeController }
