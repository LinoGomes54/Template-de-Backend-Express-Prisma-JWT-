import { RequestHandler } from 'express'
import { createContact, deleteContact, listContacts } from '../services/contactService'
import { AppError } from '../utils/appError'

// Criação de Contato
export const createContactController: RequestHandler = async (req, res, next) => {
  console.log("Tentativa de criação de contato")
  try {
    const { nome, email, contato, mensagem } = req.body
    const conteudo = contato ?? mensagem

    if (!conteudo) {
      throw new AppError('Campo contato é obrigatório', 400)
    }

    const contact = await createContact({ nome, email, contato: conteudo })
    res.status(201).json({ message: 'Contato criado', contact })
    console.log('Novo contato criado:', contact)
  } catch (error) {
    next(error)
  }
}

export const listContactsController: RequestHandler = async (_req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({ contacts })
  } catch (error) {
    next(error)
  }
}

export const deleteContactController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const removed = await deleteContact(id)
    res.json({ message: 'Contato removido', contact: removed })
  } catch (error) {
    next(error)
  }
}

