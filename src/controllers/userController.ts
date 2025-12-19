import { RequestHandler } from 'express'
import {
  deactivateUser,
  findUserById,
  listUsers,
  sanitizeUser,
  activateUser,
  changePassword
} from '../services/userService'
import { AppError } from '../utils/appError'
import { appConfig } from '../config/env'

export const meController: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId
    if (!userId) {
      throw new AppError('Usuário não autenticado', 401)
    }
    const user = await findUserById(userId)
    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }
    res.json({ user: sanitizeUser(user) })
  } catch (error) {
    next(error)
  }
}

export const listUsersController: RequestHandler = async (_req, res, next) => {
  try {
    const users = await listUsers()
    res.json({ users })
  } catch (error) {
    next(error)
  }
}

export const deactivateUserController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await deactivateUser(id)
    res.json({ message: 'Conta desativada', user })
  } catch (error) {
    next(error)
  }
}

export const activateUserController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const { adminPassword } = req.body

    if (adminPassword !== appConfig.adminPassword) {
      throw new AppError('Senha de admin inválida', 403)
    }

    const user = await activateUser(id)
    res.json({ message: 'Conta ativada', user })
  } catch (error) {
    next(error)
  }
}

export const changePasswordController: RequestHandler = async (req, res, next) => {
  try {
    const authUserId = req.userId
    const { id } = req.params
    const { senhaAtual, novaSenha } = req.body

    if (!authUserId) {
      throw new AppError('Usuário não autenticado', 401)
    }
    if (authUserId !== id) {
      throw new AppError('Operação não permitida', 403)
    }
    if (!senhaAtual || !novaSenha) {
      throw new AppError('Campos senhaAtual e novaSenha são obrigatórios', 400)
    }

    const user = await changePassword(id, senhaAtual, novaSenha)
    res.json({ message: 'Senha alterada com sucesso', user })
  } catch (error) {
    next(error)
  }
}

