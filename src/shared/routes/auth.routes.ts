import { Router } from 'express'

import { SignInController } from '@modules/Authentication/useCases/signIn/SignInController'

const authRoutes = Router()

const signInController = new SignInController()

authRoutes.post('/sign-in', signInController.handle)

export { authRoutes }
