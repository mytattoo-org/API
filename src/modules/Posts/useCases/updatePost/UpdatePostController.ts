import { container } from 'tsyringe'

import { UpdatePostService } from './UpdatePostService'
import { THandle } from './updatePost.types'

import { AppError } from '@modules/Error/models/AppError'

class UpdatePostController {
  handle: THandle = async (req, res) => {
    const updatePostService = container.resolve(UpdatePostService)

    const userId = res.locals.user.id

    if (!userId) throw new AppError('missing user_id')

    const response = await updatePostService.execute({
      id: req.body.id,
      ...req.body
    })

    return res.json(response).status(200)
  }
}

export { UpdatePostController }
