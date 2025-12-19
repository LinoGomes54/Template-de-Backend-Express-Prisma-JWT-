import { Contact, User, VerificationCode } from '../types/models'

const users: User[] = []
const contacts: Contact[] = []
const verificationCodes: VerificationCode[] = []

export const db = {
  users,
  contacts,
  verificationCodes
}


