import { Router } from 'express'

import { CreatePostController } from '@modules/Posts/useCases/createPost/CreatePostController'
import { DeletePostController } from '@modules/Posts/useCases/deletePost/DeletePostController'
import { ReadFeedController } from '@modules/Posts/useCases/readFeed/ReadFeedController'
import { ReadPostController } from '@modules/Posts/useCases/readPost/ReadPostController'
import { UpdatePostController } from '@modules/Posts/useCases/updatePost/UpdatePostController'

import { ensureAuthentication } from '@shared/middlewares/ensureAuthentication'
import { maybeAuthenticated } from '@shared/middlewares/maybeAuthenticated'

const postsRoutes = Router()
const readFeedController = new ReadFeedController()
const readPostsController = new ReadPostController()
const createPostController = new CreatePostController()
const deletePostController = new DeletePostController()
const updatePostController = new UpdatePostController()

postsRoutes.get('/posts', readPostsController.handle)
postsRoutes.get('/posts/:id', readPostsController.handle)
postsRoutes.delete('/posts/:id', deletePostController.handle)
postsRoutes.get('/feed', maybeAuthenticated, readFeedController.handle)
postsRoutes.post('/posts', ensureAuthentication, createPostController.handle)
postsRoutes.patch('/posts', ensureAuthentication, updatePostController.handle)

export { postsRoutes }
