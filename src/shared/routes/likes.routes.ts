import { Router } from 'express'

import { CreateLikeController } from '@modules/Likes/useCases/createLike/CreateLikeController'
import { DeleteLikeController } from '@modules/Likes/useCases/deleteLike/DeleteLikeController'
import { ReadLikeController } from '@modules/Likes/useCases/readLike/ReadLikeController'

import { ensureAuthentication } from '@shared/middlewares/ensureAuthentication'

const likesRoutes = Router()

const readLikeController = new ReadLikeController()
const createLikeController = new CreateLikeController()
const deleteLikeController = new DeleteLikeController()

likesRoutes.get('/likes', readLikeController.handle)
likesRoutes.post('/likes', ensureAuthentication, createLikeController.handle)
likesRoutes.delete('/likes', ensureAuthentication, deleteLikeController.handle)

export { likesRoutes }
