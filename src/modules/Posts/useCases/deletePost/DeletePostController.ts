import { container } from 'tsyringe'

import { THandle } from './DeletePost.types'
import { DeletePostService } from './DeletePostService'

class DeletePostController {
  handle: THandle = async (req, res) => {
    const deletePostService = container.resolve(DeletePostService)

    const response = await deletePostService.execute(req.params.id)

    return res.json(response).status(200)
  }
}

export { DeletePostController }
