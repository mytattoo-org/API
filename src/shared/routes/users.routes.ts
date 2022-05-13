import { Router } from 'express'

import { CreateUserController } from '@modules/Users/useCases/createUser/CreateUserController'
import { DeleteUserController } from '@modules/Users/useCases/deleteUser/DeleteUserController'
import { ReadUsersController } from '@modules/Users/useCases/readUsers/ReadUsersController'

const usersRoutes = Router()

const readUsersController = new ReadUsersController()
const createUserController = new CreateUserController()
const deleteUserController = new DeleteUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/:id?', readUsersController.handle)
usersRoutes.delete('/:id', deleteUserController.handle)

export { usersRoutes }
