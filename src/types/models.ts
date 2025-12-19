import {
  Contact as PrismaContact,
  ContactStatus,
  User as PrismaUser,
  UserStatus,
  VerificationCode as PrismaVerificationCode,
  VerificationType
} from '@prisma/client'

export { ContactStatus, UserStatus, VerificationType }

export type User = PrismaUser
export type Contact = PrismaContact
export type VerificationCode = PrismaVerificationCode



