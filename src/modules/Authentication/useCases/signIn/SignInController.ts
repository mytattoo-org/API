import { SignInService } from './SignInService'

import { container } from 'tsyringe'

import type { THandle } from './SignIn.types'

class SignInController {
  handle: THandle = async (req, res) => {
    const signInService = container.resolve(SignInService)

    const signInData = req.body

    const response = await signInService.execute(signInData)

    return res.json(response).status(200)
  }
}

export { SignInController }
