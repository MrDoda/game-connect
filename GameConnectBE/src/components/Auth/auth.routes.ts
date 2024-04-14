import { Router } from 'express'
import { AuthService } from './auth.service'

export const authRouter = Router()

authRouter.post('/login', AuthService.login)
authRouter.post('/register', AuthService.register)
