import { container } from 'tsyringe'

import { UpdateAvatarService } from './UpdateAvatarService'

class UpdateAvatarController {
  handle = async (req, res) => {
    const updateAvatarService = container.resolve(UpdateAvatarService)

    const response = await updateAvatarService.execute({
      id: res.locals.user.id,
      filename: req.file.filename
    })

    res.json(response).status(200)
  }
}

export { UpdateAvatarController }
