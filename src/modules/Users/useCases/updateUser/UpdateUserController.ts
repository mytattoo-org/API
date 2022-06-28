import { container } from 'tsyringe'

import { THandle } from './UpdateUser.types'
import { UpdateUserService } from './UpdateUserService'

class UpdateUserController {
  handle: THandle = async (req, res) => {
    const updateUserService = container.resolve(UpdateUserService)

    const response = await updateUserService.execute({
      ...req.body,
      id: req.params.id
    })

    res.status(200).json(response)
  }
}

export { UpdateUserController }
