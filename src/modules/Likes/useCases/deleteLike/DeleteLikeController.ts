import { container } from 'tsyringe'

import { THandle } from './DeleteLike.types'
import { DeleteLikeService } from './DeleteLikeService'

class DeleteLikeController {
  handle: THandle = async (req, res) => {
    const deleteLikeService = container.resolve(DeleteLikeService)

    const response = await deleteLikeService.execute(req.params.id)

    return res.json(response).status(200)
  }
}

export { DeleteLikeController }
