import express from 'express'
import {
  createContactController,
  deleteContactController,
  listContactsController
} from '../controllers/contactController'
import { requireAuth } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/', createContactController)
router.get('/', requireAuth, listContactsController)
router.delete('/:id', requireAuth, deleteContactController)

export default router


