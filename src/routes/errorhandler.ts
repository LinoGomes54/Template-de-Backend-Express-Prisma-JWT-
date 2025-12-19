import {ErrorRequestHandler, RequestHandler} from 'express'

// Exemplosde manipuladores de erros

export const notFoundRequest: RequestHandler = (req, res) => {
    res.status(404).json({error:"Rota não Encontrada"})
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err)
    res.status(500).json({error:"Erro Interno do Servidor"})
}