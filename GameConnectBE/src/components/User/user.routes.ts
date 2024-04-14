import { Router } from 'express'
import { UserService } from './user.service'

export const userRouter = Router()

userRouter.get('/me', (req, res) => UserService.getLoggedUser)
