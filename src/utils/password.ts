import bcrypt from 'bcryptjs'

export const hashPassword = async (plain: string) => {
  return bcrypt.hash(plain, 10)
}

export const comparePassword = async (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash)
}


