import { prisma } from '../lib/prisma'
import { AppError } from '../utils/appError'

export const createContact = async (payload: { nome: string; email: string; contato: string }) => {
  return prisma.contact.create({
    data: {
      nome: payload.nome,
      email: payload.email,
      mensagem: payload.contato,
      status: 'PENDENTE'
    }
  })
}

export const listContacts = async () => {
  return prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export const deleteContact = async (id: string) => {
  const removed = await prisma.contact
    .delete({
      where: { id }
    })
    .catch(() => null)

  if (!removed) {
    throw new AppError('Contato não encontrado', 404)
  }
  return removed
}

