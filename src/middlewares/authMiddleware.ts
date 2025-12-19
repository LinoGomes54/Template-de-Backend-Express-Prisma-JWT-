import { RequestHandler } from 'express'
import { verifyToken } from '../utils/token'
import { AppError } from '../utils/appError'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
  }
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Token não enviado', 401)
    }
    const token = authHeader.replace('Bearer ', '').trim()
    const payload = verifyToken(token)
    req.userId = payload.sub
    next()
  } catch (error) {
    next(error)
  }
}


