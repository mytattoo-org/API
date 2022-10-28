import { Router } from 'express'

import { CreateUserController } from '@modules/Users/useCases/createUser/CreateUserController'
import { DeleteUserController } from '@modules/Users/useCases/deleteUser/DeleteUserController'
import { ReadUsersController } from '@modules/Users/useCases/readUsers/ReadUsersController'
import { UpdateUserController } from '@modules/Users/useCases/updateUser/UpdateUserController'

import { ensureAuthentication } from '@shared/middlewares/ensureAuthentication'

const usersRoutes = Router()

const readUsersController = new ReadUsersController()
const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

usersRoutes.post('/users/', createUserController.handle)
usersRoutes.get('/users/:id?', readUsersController.handle)
usersRoutes.delete('/users/:id', deleteUserController.handle)
usersRoutes.patch('/users', ensureAuthentication, updateUserController.handle)
usersRoutes.get('/user', ensureAuthentication, readUsersController.handle)

export { usersRoutes }
