import { container } from 'tsyringe'
import { THandle } from '../deleteUser/DeleteUser.types'
import { DeleteUserService } from './DeleteUserService'

class DeleteUserController {
  handle: THandle = async (req, res) => {
    const id = req.params.id

    const deleteUserService = container.resolve(DeleteUserService)

    const response = await deleteUserService.execute(id)

    return res.status(200).json(response)
  }
}

export { DeleteUserController }
