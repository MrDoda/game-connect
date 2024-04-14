import express from 'express'
import { authRouter } from './components/Auth/auth.routes'
import { userRouter } from './components/User/user.routes'
import { authenticateToken } from './middlewares/authenticateToken.middleware'

export const app = express()
app.use(express.json())
app.use('/auth', authRouter)
app.use('/user', authenticateToken, userRouter)
