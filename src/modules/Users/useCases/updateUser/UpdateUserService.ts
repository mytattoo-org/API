
import { IUsersRepository } from "@modules/Users/repositories/User/IUserRepository.types"

import { inject, injectable } from "tsyringe"
import type { TExecute } from "./UpdateUser.types"

@injectable()
class UpdateUserService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) {}

  execute: TExecute = async (dataToUpdate) => {
    await this.usersRepository.update(dataToUpdate)

    const updatedUser = await this.usersRepository.findById(dataToUpdate.id)

    return { updatedUser }
  }
}

export { UpdateUserService }
