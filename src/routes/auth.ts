import express from 'express'
import {
  loginController,
  recoveryConfirmController,
  recoveryRequestController,
  requestVerificationCodeController,
  signupController,
  verifyEmailController
} from '../controllers/authController'

const router = express.Router()

router.post('/signup', signupController)
router.post('/verify-email', verifyEmailController)
router.post('/verify-email/request', requestVerificationCodeController)
router.post('/login', loginController)
router.post('/recover/request', recoveryRequestController)
router.post('/recover/confirm', recoveryConfirmController)

export default router


