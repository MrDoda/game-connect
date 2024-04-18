import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../components/User/user.model'

export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'GET') return next()
  if (req.user?.role !== 'admin') {
    return res.status(403).send({ message: 'Unauthorized' })
  }
  next()
}
