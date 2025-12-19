import 'dotenv/config'

const parsedPort = Number(process.env.PORT)

const requireEnv = (name: string) => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`A variável de ambiente ${name} é obrigatória.`)
  }
  return value
}

export const appConfig = {
  port: Number.isFinite(parsedPort) ? parsedPort,
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  verificationCodeTtlMinutes: 15,
  adminPassword: process.env.ADMIN_PASSWORD,
  smtp: {
    host: requireEnv('SMTP_HOST'),
    port: Number(requireEnv('SMTP_PORT')),
    user: requireEnv('SMTP_USER'),
    pass: requireEnv('SMTP_PASS'),
    from: requireEnv('SMTP_FROM')
  }
}
