import { RequestHandler } from 'express'
import {
  confirmRecovery,
  login,
  registerUser,
  requestEmailVerification,
  requestRecovery,
  verifyEmail
} from '../services/authService'

// Registar a Conta
export const signupController: RequestHandler = async (req, res, next) => {
  try {
    const { nome, sobrenome, telefone, email, senha, plano, tokens } = req.body
    const result = await registerUser({
      nome,
      sobrenome,
      telefone,
      email,
      senha,
      plano,
      tokens
    })
    console.log(result,req.body)
    res.status(201).json({
      message: 'Conta criada. Use o código enviado para verificar o e-mail.',
      user: result.user,
      verificationCode: result.verificationCode
    })
  } catch (error) {
    next(error)
  }
}

// Verificar a Conta
export const verifyEmailController: RequestHandler = async (req, res, next) => {
  try {
    const { email, code } = req.body
    const user = await verifyEmail(email, code)
    res.json({ message: 'E-mail verificado com sucesso', user })
  } catch (error) {
    next(error)
  }
}

// Logar Usuário
export const loginController: RequestHandler = async (req, res, next) => {
  console.log("Tentativa de Login")

  console.log("LOGIN BODY:", req.body);
  console.log("email:", req.body?.email);
  console.log("senha existe?", Boolean(req.body?.senha));
  try {
    const { email, senha } = req.body
    const result = await login(email, senha)
    res.json({ token: result.token, user: result.user })
    console.log("Login bem-sucedido")
    console.log('Token:', result.token)
  } catch (error) {
    next(error)
  }
}

// Recuperar Conta
export const recoveryRequestController: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body
    const result = await requestRecovery(email)
    res.json({
      message: 'Código de recuperação gerado',
      code: result.code
    })
  } catch (error) {
    next(error)
  }
}

// Requisitar Verificação de Conta
export const requestVerificationCodeController: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body
    const result = await requestEmailVerification(email)
    res.json({
      message: 'Código de verificação gerado',
      code: result.code,
      expiresAt: result.expiresAt,
      expiresInMinutes: result.expiresInMinutes
    })
  } catch (error) {
    next(error)
  }
}

// Confirmar Recuperação de Conta
export const recoveryConfirmController: RequestHandler = async (req, res, next) => {
  try {
    const { email, code, novaSenha } = req.body
    const user = await confirmRecovery(email, code, novaSenha)
    res.json({ message: 'Senha redefinida', user })
  } catch (error) {
    next(error)
  }
}

