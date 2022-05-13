import { container } from 'tsyringe'

import type { THandle } from './CreateUser.types'
import { CreateUserService } from './CreateUserService'

class CreateUserController {
  handle: THandle = async (req, res) => {
    const createUserService = container.resolve(CreateUserService)

    const dataToCreate = req.body

    const response = await createUserService.execute(dataToCreate)

    return res.status(201).json(response)
  }
}

export { CreateUserController }
