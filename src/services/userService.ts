import { AppError } from '../utils/appError'
import { prisma } from '../lib/prisma'
import { User, UserStatus } from '../types/models'
import { comparePassword, hashPassword } from '../utils/password'

export type UserCreateInput = {
  nome: string
  sobrenome: string
  telefone: string
  email: string
  passwordHash: string
  emailVerificado: boolean
  plano?: string | null
  tokens?: number | null
  status: UserStatus
}

export const sanitizeUser = (user: User) => {
  const { passwordHash, ...safe } = user
  return safe
}

export const createUser = async (userData: UserCreateInput) => {
  const normalizedEmail = userData.email.toLowerCase()
  const user = await prisma.user.create({
    data: {
      ...userData,
      email: normalizedEmail
    }
  })
  return user
}

export const findUserByEmail = async (email: string) => {
  const normalized = email.toLowerCase()
  return prisma.user.findUnique({ where: { email: normalized } })
}

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } })
}

export const listUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return users.map(sanitizeUser)
}

export const deactivateUser = async (id: string) => {
  const user = await prisma.user
    .update({
      where: { id },
      data: { status: 'INACTIVE' }
    })
    .catch(() => null)

  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }
  return sanitizeUser(user)
}

export const activateUser = async (id: string) => {
  const user = await prisma.user
    .update({
      where: { id },
      data: { status: 'ACTIVE' }
    })
    .catch(() => null)

  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }
  return sanitizeUser(user)
}

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new AppError('Usuário não encontrado', 404)
  }
  const isValid = await comparePassword(currentPassword, user.passwordHash)
  if (!isValid) {
    throw new AppError('Senha atual incorreta', 401)
  }
  const passwordHash = await hashPassword(newPassword)
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { passwordHash }
  })
  return sanitizeUser(updated)
}

