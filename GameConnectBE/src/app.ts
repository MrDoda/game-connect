import express from 'express'
import cors from 'cors'
import { authRouter } from './components/Auth/auth.routes'
import { userRouter } from './components/User/user.routes'
import { authenticateToken } from './middlewares/authenticateToken.middleware'
import { pageRouter } from './components/Page/page.routes'
import { menuItemRouter } from './components/MenuItem/menuItem.routes'
import { postRouter } from './components/Post/post.routes'
import { commentRouter } from './components/Comment/comment.routes'
import { isAdminMiddleware } from './middlewares/isAdmin.middleware'
import { openAiRouter } from './components/OpenAI/openai.routes'

export const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/comment', authenticateToken, commentRouter)
app.use('/user', authenticateToken, isAdminMiddleware, userRouter)
app.use('/page', authenticateToken, isAdminMiddleware, pageRouter)
app.use('/post', authenticateToken, isAdminMiddleware, postRouter)
app.use('/menu-item', authenticateToken, isAdminMiddleware, menuItemRouter)
app.use('/openai', authenticateToken, isAdminMiddleware, openAiRouter)
