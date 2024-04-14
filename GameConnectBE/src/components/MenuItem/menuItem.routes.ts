import { Router } from 'express'
import { MenuItemService } from './menuItem.service'

export const menuItemRouter = Router()

menuItemRouter.post('/', MenuItemService.createMenuItem)
menuItemRouter.get('/', MenuItemService.getMenuItems)
