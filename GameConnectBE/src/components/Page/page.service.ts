import type Express from 'express'
import Page from './page.model'
import { MenuItemService } from '../MenuItem/menuItem.service'
import { getErrorMessageFromSequelize } from '../../utils/getErrorMessageFromSequelize'
import { ValidationError } from 'sequelize'

export const PageService = {
  createPage: async (req: Express.Request, res: Express.Response) => {
    try {
      const { content, title, url } = req.body
      const ownerId = req.user?.id

      const newPage = await Page.create({
        content,
        title,
        url,
        ownerId,
      })

      return res.status(201).send(newPage)
    } catch (error: ValidationError | any) {
      console.error('[ERROR] Unable to create page:', error)
      return res.status(400).send(getErrorMessageFromSequelize(error))
    }
  },

  deletePage: async (req: Express.Request, res: Express.Response) => {
    try {
      const pageId = parseInt(req.params.pageId)
      await Page.destroy({ where: { id: pageId }, force: true })

      return res.status(200).send({ message: 'Page deleted' })
    } catch (error: ValidationError | any) {
      console.error('[ERROR] Unable to delete page:', error)
      return res.status(400).send(getErrorMessageFromSequelize(error))
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
    } catch (error: ValidationError | any) {
      console.error('[ERROR] Unable to retrieve pages:', error)
      return res.status(500).send(getErrorMessageFromSequelize(error))
    }
  },

  getPageById: async (req: Express.Request, res: Express.Response) => {
    try {
      const pageId = parseInt(req.params.pageId)
      const page = await Page.findByPk(pageId)
      return res.send(page)
    } catch (error: ValidationError | any) {
      console.error('[ERROR] Unable to retrieve page:', error)
      return res.status(500).send(getErrorMessageFromSequelize(error))
    }
  },

  updatePage: async (req: Express.Request, res: Express.Response) => {
    try {
      const pageId = parseInt(req.params.pageId)
      console.log('pageId:', pageId)
      const { content, title, url } = req.body
      const page = await Page.findByPk(pageId)
      if (!page) {
        return res.status(404).send({ message: 'Page not found' })
      }
      page.content = content
      page.title = title
      page.url = url
      await page.save()
      return res.send(page)
    } catch (error: ValidationError | any) {
      console.error('[ERROR] Unable to update page:', error)
      return res.status(500).send(getErrorMessageFromSequelize(error))
    }
  },
}
