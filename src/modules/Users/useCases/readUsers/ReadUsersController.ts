import { container } from 'tsyringe'

import type { THandle } from './ReadUsers.types'
import { ReadUsersService } from './ReadUsersService'

class ReadUsersController {
  handle: THandle = async (req, res) => {
    const id = req.params.id || res.locals.user?.id

    const readUsersService = container.resolve(ReadUsersService)

    const response = await readUsersService.execute(id)

    res.json(response).status(200)
  }
}

export { ReadUsersController }
