import jwt from 'jsonwebtoken'
import { appConfig } from '../config/env'

interface TokenPayload {
  sub: string
  email: string
}

export const signToken = (payload: TokenPayload) => {
  const options: jwt.SignOptions = {
    expiresIn: appConfig.jwtExpiresIn as jwt.SignOptions['expiresIn']
  }
  return jwt.sign(payload as jwt.JwtPayload, appConfig.jwtSecret, options)
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, appConfig.jwtSecret) as TokenPayload
}

