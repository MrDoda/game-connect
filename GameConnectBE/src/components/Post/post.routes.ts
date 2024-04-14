import { Router } from 'express'
import { PostService } from './post.service'

export const postRouter = Router()

postRouter.post('/', PostService.createPost)
postRouter.get('/', PostService.getPosts)
postRouter.get('/page/:pageId', PostService.getPostsByPageId)
