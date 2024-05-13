import { Router } from 'express'
import { PageService } from './page.service'

export const pageRouter = Router()

pageRouter.post('/', PageService.createPage)
pageRouter.delete('/:pageId', PageService.deletePage)
pageRouter.patch('/:pageId', PageService.updatePage)
pageRouter.get('/', PageService.getPages)
pageRouter.get('/url/', PageService.getPageByURL)
pageRouter.get('/:pageId', PageService.getPageById)
