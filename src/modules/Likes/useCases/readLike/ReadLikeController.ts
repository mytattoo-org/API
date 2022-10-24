import { container } from 'tsyringe'

import { ReadLikeService } from './ReadLikeService'
import { THandle } from './readLike.types'

class ReadLikeController {
  handle: THandle = async (req, res) => {
    const readLikeService = container.resolve(ReadLikeService)

    const response = await readLikeService.execute({
      post_id: req.body.post_id,
      user_id: req.body.user_id
    })

    return res.json(response).status(200)
  }
}

export { ReadLikeController }
