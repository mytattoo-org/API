import { Router } from 'express'

import { CreatePostController } from '@modules/Posts/useCases/createPost/CreatePostController'
import { DeletePostController } from '@modules/Posts/useCases/deletePost/DeletePostController'
import { ReadPostController } from '@modules/Posts/useCases/readPost/ReadPostController'

const postsRoutes = Router()

const readPostsController = new ReadPostController()
const createPostController = new CreatePostController()
const deletePostController = new DeletePostController()

postsRoutes.get('/', readPostsController.handle)
postsRoutes.get('/:id', readPostsController.handle)
postsRoutes.post('/', createPostController.handle)
postsRoutes.delete('/:id', deletePostController.handle)

export { postsRoutes }
