import { Router } from 'express'
import multer from 'multer'

import { CreateUserController } from '@modules/Users/useCases/createUser/CreateUserController'
import { DeleteUserController } from '@modules/Users/useCases/deleteUser/DeleteUserController'
import { ReadUsersController } from '@modules/Users/useCases/readUsers/ReadUsersController'
import { UpdateAvatarController } from '@modules/Users/useCases/updateAvatar/UpdateAvatarController'
import { UpdateUserController } from '@modules/Users/useCases/updateUser/UpdateUserController'

import { ensureAuthentication } from '@shared/middlewares/ensureAuthentication'

const usersRoutes = Router()
const upload = multer({ dest: './temp/avatar/' })

const readUsersController = new ReadUsersController()
const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()
const updateAvatarController = new UpdateAvatarController()

usersRoutes.post('/users/', createUserController.handle)
usersRoutes.get('/users/:id?', readUsersController.handle)
usersRoutes.patch('/users/:id', updateUserController.handle)
usersRoutes.delete('/users/:id', deleteUserController.handle)

usersRoutes.put(
  '/user/avatar',
  ensureAuthentication,
  upload.single('file'),
  updateAvatarController.handle
)

usersRoutes.get('/user', ensureAuthentication, readUsersController.handle)

export { usersRoutes }
