import { Router } from 'express'

import { CreateUserController } from '@modules/Users/useCases/createUser/CreateUserController'
import { DeleteUserController } from '@modules/Users/useCases/deleteUser/DeleteUserController'
import { ReadUsersController } from '@modules/Users/useCases/readUsers/ReadUsersController'
import { UpdateUserController } from '@modules/Users/useCases/updateUser/UpdateUserController'

const usersRoutes = Router()

const readUsersController = new ReadUsersController()
const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/:id?', readUsersController.handle)
usersRoutes.patch('/:id', updateUserController.handle)
usersRoutes.delete('/:id', deleteUserController.handle)

export { usersRoutes }
