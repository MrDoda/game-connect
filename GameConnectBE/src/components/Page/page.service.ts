import type Express from 'express'
import Page from './page.model'
import User from '../User/user.model'

export const PageService = {
  createPage: async (req: Express.Request, res: Express.Response) => {
    try {
      const { content, title, url, menuItem } = req.body
      const ownerId = req.user?.id

      const newPage = await Page.create({
        content,
        title,
        url,
        ownerId,
      })

      res.status(201).send(newPage)
    } catch (error) {
      console.error('[ERROR] Unable to create page:', error)
      res.status(500).send({ message: 'Error creating new page' })
    }
  },

  getPages: async (req: Express.Request, res: Express.Response) => {
    try {
      const ownerId = req.user?.id

      const pages = await Page.findAll({
        where: { ownerId },
      })

      res.send(pages)
    } catch (error) {
      console.error('[ERROR] Unable to retrieve pages:', error)
      res.status(500).send({ message: 'Error retrieving pages' })
    }
  },
}
