import { Router } from 'express'

import { CreatePostController } from '@modules/Posts/useCases/createPost/CreatePostController'
import { DeletePostController } from '@modules/Posts/useCases/deletePost/DeletePostController'
import { ReadFeedController } from '@modules/Posts/useCases/readFeed/ReadFeedController'
import { ReadPostController } from '@modules/Posts/useCases/readPost/ReadPostController'

const postsRoutes = Router()

const readPostsController = new ReadPostController()
const createPostController = new CreatePostController()
const deletePostController = new DeletePostController()
const readFeedController = new ReadFeedController()

postsRoutes.get('/posts', readPostsController.handle)
postsRoutes.get('/posts/:id', readPostsController.handle)
postsRoutes.post('/posts', createPostController.handle)
postsRoutes.delete('/posts/:id', deletePostController.handle)

postsRoutes.get('/feed', readFeedController.handle)

export { postsRoutes }
