import { Router } from 'express'
import { CommentService } from './comment.service'

export const commentRouter = Router()

commentRouter.post('/', CommentService.createComment)
commentRouter.get('/post/:postId', CommentService.getCommentsByPostId)
