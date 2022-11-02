import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

const maybeAuthenticated: RequestHandler<any> = async (req, res, next) => {
  if (!req.headers.authorization) return next()

  const token = req.headers.authorization.split(' ')[1]

  try {
    const { sub } = jwt.verify(token, process.env.API_JWT_SECRET)
    res.locals.user = { id: sub }
  } catch (error) {
    return next()
  }

  return next()
}

export { maybeAuthenticated }
