import { Router } from 'express'

import { CreateCommentController } from '@modules/Comments/useCases/createComment/CreateCommentController'
import { DeleteCommentController } from '@modules/Comments/useCases/deleteComment/DeleteLikeController'
import { ReadCommentController } from '@modules/Comments/useCases/readComments/ReadCommentsController'
import { UpdateCommentController } from '@modules/Comments/useCases/updateComment/UpdateCommentController'

import { ensureAuthentication } from '@shared/middlewares/ensureAuthentication'

const commentsRoutes = Router()

const readCommentsController = new ReadCommentController()
const createCommentController = new CreateCommentController()
const updateCommentController = new UpdateCommentController()
const deleteCommentController = new DeleteCommentController()

commentsRoutes.post(
  '/comments',
  ensureAuthentication,
  createCommentController.handle
)

commentsRoutes.get('/comments', readCommentsController.handle)

commentsRoutes.delete(
  '/comments/:id',
  ensureAuthentication,
  deleteCommentController.handle
)

commentsRoutes.patch(
  '/comments',
  ensureAuthentication,
  updateCommentController.handle
)

export { commentsRoutes }
