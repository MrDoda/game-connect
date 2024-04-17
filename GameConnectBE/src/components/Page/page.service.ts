import type Express from 'express'
import Page from './page.model'

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

      return res.status(201).send(newPage)
    } catch (error) {
      console.error('[ERROR] Unable to create page:', error)
      return res.status(500).send({ message: 'Error creating new page' })
    }
  },

  getPages: async (req: Express.Request, res: Express.Response) => {
    try {
      const pages = await Page.findAll()

      return res.send(pages)
    } catch (error) {
      console.error('[ERROR] Unable to retrieve pages:', error)
      return res.status(500).send({ message: 'Error retrieving pages' })
    }
  },

  getPageByURL: async (req: Express.Request, res: Express.Response) => {
    try {
      const url = req.query.url
      const page = await Page.findOne({
        where: {
          url,
        },
      })
      return res.send(page)
    } catch (error) {
      console.error('[ERROR] Unable to retrieve pages:', error)
      return res.status(500).send({ message: 'Error retrieving page by url' })
    }
  },
}
