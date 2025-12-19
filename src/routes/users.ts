import express from 'express'
import {
  deactivateUserController,
  listUsersController,
  meController,
  activateUserController,
  changePasswordController
} from '../controllers/userController'
import { requireAuth } from '../middlewares/authMiddleware'

const router = express.Router()

router.get('/me', requireAuth, meController)
router.get('/', requireAuth, listUsersController)
router.patch('/:id/deactivate', requireAuth, deactivateUserController)
router.patch('/:id/activate', requireAuth, activateUserController)
router.patch('/:id/password', requireAuth, changePasswordController)

export default router


