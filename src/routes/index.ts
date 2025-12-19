import express from 'express'
import authRouter from './auth'
import usersRouter from './users'
import contactsRouter from './contacts'
import pingRouter from './ping'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/contacts', contactsRouter)
router.use('/ping', pingRouter)

export default router