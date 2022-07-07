import { container } from 'tsyringe'

import { THandle } from './CreatePost.types'
import { CreatePostService } from './CreatePostService'

class CreatePostController {
  handle: THandle = async (req, res) => {
    const createPostService = container.resolve(CreatePostService)

    const response = await createPostService.execute(req.body)

    return res.json(response).status(201)
  }
}

export { CreatePostController }
