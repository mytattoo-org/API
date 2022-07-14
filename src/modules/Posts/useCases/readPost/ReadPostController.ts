import { container } from 'tsyringe'

import { THandle } from './ReadPost.types'
import { ReadPostService } from './ReadPostService'

class ReadPostController {
  handle: THandle = async (req, res) => {
    const readPostService = container.resolve(ReadPostService)

    const response = await readPostService.execute(req.params.id)

    return res.json(response).status(200)
  }
}

export { ReadPostController }
