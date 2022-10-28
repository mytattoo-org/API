import { container } from 'tsyringe'

import { THandle } from './DeleteLike.types'
import { DeleteLikeService } from './DeleteLikeService'

class DeleteLikeController {
  handle: THandle = async (req, res) => {
    const deleteLikeService = container.resolve(DeleteLikeService)

    const response = await deleteLikeService.execute({
      post_id: req.body.post_id,
      user_id: req.body.user_id
    })

    return res.json(response).status(200)
  }
}

export { DeleteLikeController }
