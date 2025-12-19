import express from 'express'
import helmet from 'helmet'
import router from './routes'
import cors from 'cors'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler'
import { appConfig } from './config/env'


const server = express()

server.use(cors({
  origin: "http://localhost:3000", // Defina a origem permitida
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

server.use(helmet())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use('/', router)
server.use(notFoundHandler)
server.use(errorHandler)
server.use

const port = appConfig.port

server.listen(port, () => {
  console.log(`Servidor disponível em http://localhost:${port}/`)
})