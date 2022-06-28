import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import { AppError } from '@modules/Error/models/AppError'

const ensureAuthentication: RequestHandler<any> = async (req, res, next) => {
  if (!req.headers.authorization) throw new AppError('Missing token', 401)

  const token = req.headers.authorization.split(' ')[1]

  if (!token) throw new AppError('Invalid token', 401)

  try {
    const { sub } = jwt.verify(token, process.env.API_JWT_SECRET)
    res.locals.user = { id: sub }
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }

  return next()
}

export { ensureAuthentication }
