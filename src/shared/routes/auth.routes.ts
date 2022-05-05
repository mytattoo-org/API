import { SignInController } from '@modules/Authentication/useCases/signIn/SignInController'

import { Router } from 'express'

const authRoutes = Router()

const signInController = new SignInController()

authRoutes.post('/sign-in', signInController.handle)

export { authRoutes }
