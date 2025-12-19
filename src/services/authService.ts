import { randomInt } from 'crypto'
import { AppError } from '../utils/appError'
import { hashPassword, comparePassword } from '../utils/password'
import { signToken } from '../utils/token'
import { appConfig } from '../config/env'
import { createUser, findUserByEmail, sanitizeUser } from './userService'
import { sendMail } from './mailService'
import {
  recoveryEmailTemplate,
  verificationEmailTemplate,
  verificationSuccessTemplate
} from '../utils/mailTemplates'
import { prisma } from '../lib/prisma'
import { VerificationType } from '../types/models'

const createVerificationCode = async (userId: string, type: VerificationType) => {
  const code = String(randomInt(100000, 999999))
  const expiresAt = new Date(Date.now() + appConfig.verificationCodeTtlMinutes * 60 * 1000)

  return prisma.verificationCode.create({
    data: {
      code,
      expiresAt,
      type,
      userId
    }
  })
}

const validateCode = async (userId: string, code: string, type: VerificationType) => {
  const record = await prisma.verificationCode.findFirst({
    where: { userId, code, type, used: false },
    orderBy: { createdAt: 'desc' }
  })

  if (!record) {
    throw new AppError('Código inválido', 400)
  }
  if (record.expiresAt.getTime() < Date.now()) {
    throw new AppError('Código expirado', 400)
  }

  await prisma.verificationCode.update({
    where: { id: record.id },
    data: { used: true }
  })
}

export const registerUser = async (payload: {
  nome: string
  sobrenome: string
  telefone: string
  email: string
  senha: string
  plano?: string | null
  tokens?: number | null
}) => {
  const existing = await findUserByEmail(payload.email)
  if (existing) {
    throw new AppError('E-mail já cadastrado', 409)
  }

  const passwordHash = await hashPassword(payload.senha)

  const user = await createUser({
    nome: payload.nome,
    sobrenome: payload.sobrenome,
    telefone: payload.telefone,
    email: payload.email.toLowerCase(),
    passwordHash,
    emailVerificado: false,
    plano: payload.plano ?? null,
    tokens: payload.tokens ?? null,
    status: 'ACTIVE'
  })

  const verification = await createVerificationCode(user.id, 'EMAIL_VERIFICATION')

  await sendMail(
    user.email,
    'GiroHub - Código de verificação',
    verificationEmailTemplate(verification.code)
  )

  return { user: sanitizeUser(user), verificationCode: verification.code }
}

export const verifyEmail = async (email: string, code: string) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }
  await validateCode(user.id, code, 'EMAIL_VERIFICATION')

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { emailVerificado: true }
  })

  await sendMail(updated.email, 'GiroHub - Conta verificada', verificationSuccessTemplate())

  return sanitizeUser(updated)
}

export const requestEmailVerification = async (email: string) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }
  if (user.status !== 'ACTIVE') {
    throw new AppError('Conta desativada', 403)
  }
  if (user.emailVerificado) {
    throw new AppError('E-mail já verificado', 409)
  }

  const verification = await createVerificationCode(user.id, 'EMAIL_VERIFICATION')

  await sendMail(
    user.email,
    'GiroHub - Código de verificação',
    verificationEmailTemplate(verification.code)
  )

  return {
    code: verification.code,
    expiresAt: verification.expiresAt,
    expiresInMinutes: appConfig.verificationCodeTtlMinutes
  }
}

export const login = async (email: string, senha: string) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new AppError('Credenciais inválidas', 401)
  }
  if (user.status !== 'ACTIVE') {
    throw new AppError('Conta desativada', 403)
  }
  if (!user.emailVerificado) {
    throw new AppError('E-mail não verificado', 403)
  }
  const isValid = await comparePassword(senha, user.passwordHash)
  if (!isValid) {
    throw new AppError('Credenciais inválidas', 401)
  }
  const token = signToken({ sub: user.id, email: user.email })
  return { token, user: sanitizeUser(user) }
}

export const requestRecovery = async (email: string) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }
  const verification = await createVerificationCode(user.id, 'ACCOUNT_RECOVERY')

  await sendMail(
    user.email,
    'GiroHub - Código de recuperação',
    recoveryEmailTemplate(verification.code)
  )

  return { code: verification.code }
}

export const confirmRecovery = async (email: string, code: string, newPassword: string) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }
  await validateCode(user.id, code, 'ACCOUNT_RECOVERY')
  const passwordHash = await hashPassword(newPassword)
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash }
  })
  return sanitizeUser(updated)
}

