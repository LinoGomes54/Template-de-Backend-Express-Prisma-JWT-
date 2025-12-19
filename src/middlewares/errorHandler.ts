import { ErrorRequestHandler, RequestHandler } from 'express'
import { AppError } from '../utils/appError'

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  console.error(err)
  res.status(500).json({ error: 'Erro interno do servidor' })
}


