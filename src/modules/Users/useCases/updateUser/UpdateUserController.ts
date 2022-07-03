import { container } from 'tsyringe'

import { UpdateUserService } from './UpdateUserService'

class UpdateUserController {
  handle: any = async (req, res) => {
    const updateUserService = container.resolve(UpdateUserService)

    const response = await updateUserService.execute({
      ...req.body,
      id: res.locals.user.id
    })

    res.json(response).status(200)
  }
}

export { UpdateUserController }
