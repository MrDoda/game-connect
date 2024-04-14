import { Router } from 'express'
import { UserService } from './user.service'

export const userRouter = Router()

userRouter.get('/me', UserService.getLoggedUser)
