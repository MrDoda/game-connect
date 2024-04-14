import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../components/User/user.model'

declare global {
  namespace Express {
    interface Request {
      user: Partial<User>
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-authenticate'] as string

  if (!token) {
    return res.status(401).send({ message: 'No token provided' })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Invalid token' })
    }
    req.user = user as Partial<User>
    next()
  })
}
