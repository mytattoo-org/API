import { container } from 'tsyringe'

import type { THandle } from './ReadFeed.types'
import { ReadFeedService } from './ReadFeedService'

class ReadFeedController {
  handle: THandle = async (req, res) => {
    const readFeedService = container.resolve(ReadFeedService)

    const response = await readFeedService.execute(res.locals?.user?.id)

    return res.json(response).status(200)
  }
}

export { ReadFeedController }
