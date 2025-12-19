import nodemailer from 'nodemailer'
import { appConfig } from '../config/env'

const transporter = nodemailer.createTransport({
  host: appConfig.smtp.host,
  port: appConfig.smtp.port,
  secure: appConfig.smtp.port === 465,
  auth: {
    user: appConfig.smtp.user,
    pass: appConfig.smtp.pass
  }
})

export const sendMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: appConfig.smtp.from,
    to,
    subject,
    html
  })
}

