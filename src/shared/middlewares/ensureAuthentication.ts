import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import { AppError } from '@modules/Error/entities/AppError'

const ensureAuthentication: RequestHandler<any> = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) throw new AppError('Missing JWT token', 401)

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET)
    res.locals.user = { id: sub }
  } catch (error) {
    throw new AppError('Invalid JWT', 401)
  }

  return next()
}

export { ensureAuthentication }
