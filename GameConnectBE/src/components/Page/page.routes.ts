import { Router } from 'express'
import { PageService } from './page.service'

export const pageRouter = Router()

pageRouter.post('/', PageService.createPage)
pageRouter.get('/', PageService.getPages)
