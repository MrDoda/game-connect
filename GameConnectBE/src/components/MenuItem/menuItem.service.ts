import type Express from 'express'
import { Database } from '../../config/database'
import MenuItem from './menuItem.model'
import { Op } from 'sequelize'

export const MenuItemService = {
  createMenuItem: async (req: Express.Request, res: Express.Response) => {
    const { pageId, customUrl, name, menuLocation, orderNumber } = req.body
    const ownerId = req.user?.id

    const transaction = await Database.getInstance().transaction()

    try {
      await MenuItem.update(
        {
          orderNumber: Database.getInstance().literal('orderNumber + 1'),
        },
        {
          where: {
            ownerId: ownerId,
            menuLocation: menuLocation,
            orderNumber: {
              [Op.gte]: orderNumber,
            },
          },
          transaction: transaction,
        }
      )

      const newMenuItem = await MenuItem.create(
        {
          pageId,
          ownerId,
          customUrl,
          name,
          menuLocation,
          orderNumber,
        },
        { transaction }
      )

      await transaction.commit()

      res.status(201).send(newMenuItem)
    } catch (error) {
      await transaction.rollback()
      console.error(
        '[ERROR] Failed to create MenuItem with adjusted order:',
        error
      )
      res
        .status(500)
        .send({ message: 'Failed to create MenuItem with adjusted order' })
    }
  },

  getMenuItems: async (req: Express.Request, res: Express.Response) => {
    try {
      const ownerId = req.user?.id

      const menuItems = await MenuItem.findAll({
        where: { ownerId },
      })

      res.send(menuItems)
    } catch (error) {
      console.error('[ERROR] Unable to retrieve menu items:', error)
      res.status(500).send({ message: 'Error retrieving menu items' })
    }
  },
}
