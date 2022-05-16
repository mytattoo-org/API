import cors from 'cors'
import express from 'express'
import swagger from 'swagger-ui-express'

import { authRoutes } from './auth.routes'
import { usersRoutes } from './users.routes'

import { ThrowAppErrorController } from '@modules/Error/useCases/throwError/ThrowAppErrorController'

import { swaggerDocument } from '@docs/swaggerDocument'

const app = express()
const errorHandler = new ThrowAppErrorController().handle

app.use(cors())
app.use(express.json())

app.use('/docs', swagger.serve, swagger.setup(swaggerDocument))

app.use('/users', usersRoutes)
app.use('/auth', authRoutes)

app.use(errorHandler)

export { app }