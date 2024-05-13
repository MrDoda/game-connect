import { Router } from 'express'
import { PostService } from './post.service'

export const postRouter = Router()

postRouter.post('/', PostService.createPost)
postRouter.delete('/:postId', PostService.deletePost)
postRouter.patch('/:postId', PostService.updatePost)
postRouter.get('/', PostService.getPosts)
postRouter.get('/page/:pageId', PostService.getPostsByPageId)
postRouter.get('/:postId', PostService.getPostById)
