import { Router } from 'express'

import { CreateLikeController } from '@modules/Likes/useCases/createLike/CreateLikeController'
import { DeleteLikeController } from '@modules/Likes/useCases/deleteLike/DeleteLikeController'

import { ensureAuthentication } from '@shared/middlewares/ensureAuthentication'

const likesRoutes = Router()

const createLikeController = new CreateLikeController()
const deleteLikeController = new DeleteLikeController()

likesRoutes.post('/likes', ensureAuthentication, createLikeController.handle)
likesRoutes.delete(
  '/likes/:id',
  ensureAuthentication,
  deleteLikeController.handle
)

export { likesRoutes }
