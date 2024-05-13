import Post from './post.model'
import type Express from 'express'
import Page from '../Page/page.model'
import { ValidationError } from 'sequelize'
import { getErrorMessageFromSequelize } from '../../utils/getErrorMessageFromSequelize'

export const PostService = {
  createPost: async (req: Express.Request, res: Express.Response) => {
    const { title, content, pageId } = req.body

    const ownerId = req.user?.id

    try {
      const newPost = await Post.create({
        title,
        content,
        ownerId,
        pageId,
      })

      return res.status(201).send(newPost)
    } catch (error) {
      console.error('[ERROR] Failed to create post:', error)
      return res.status(500).send({ message: 'Failed to create post' })
    }
  },

  deletePost: async (req: Express.Request, res: Express.Response) => {
    try {
      const postId = parseInt(req.params.postId)
      await Post.destroy({ where: { id: postId } })

      return res.status(200).send({ message: 'Post deleted' })
    } catch (error: ValidationError | any) {
      console.error('[ERROR] Unable to delete post:', error)
      return res.status(400).send(getErrorMessageFromSequelize(error))
    }
  },

  getPosts: async (req: Express.Request, res: Express.Response) => {
    try {
      const posts = await Post.findAll()

      if (posts.length > 0) {
        return res.send(posts)
      } else {
        return res
          .status(404)
          .send({ message: 'No posts found for the given owner' })
      }
    } catch (error) {
      console.error('[ERROR] Failed to retrieve posts:', error)
      return res.status(500).send({ message: 'Error retrieving posts' })
    }
  },

  getPostsByPageId: async (req: Express.Request, res: Express.Response) => {
    const pageId = parseInt(req.params.pageId)
    if (!pageId) {
      return res.status(400).send({ message: 'Invalid page ID provided' })
    }

    try {
      const posts = await Post.findAll({
        where: {
          pageId: pageId,
        },
      })

      if (posts.length > 0) {
        return res.send(posts)
      } else {
        return res
          .status(404)
          .send({ message: 'No posts found for the given page' })
      }
    } catch (error) {
      console.error('[ERROR] Failed to retrieve posts by page:', error)
      return res.status(500).send({ message: 'Error retrieving posts by page' })
    }
  },

  getPostById: async (req: Express.Request, res: Express.Response) => {
    const postId = parseInt(req.params.postId)

    if (!postId) {
      return res.status(400).send({ message: 'Invalid post ID provided' })
    }

    try {
      const post = await Post.findByPk(postId)

      if (post) {
        return res.send(post)
      } else {
        return res
          .status(404)
          .send({ message: 'No post found for the given ID' })
      }
    } catch (error) {
      console.error('[ERROR] Failed to retrieve post by ID:', error)
      return res.status(500).send({ message: 'Error retrieving post by ID' })
    }
  },

  updatePost: async (req: Express.Request, res: Express.Response) => {
    try {
      const postId = parseInt(req.params.postId)
      const { content, title, pageId } = req.body
      const post = await Post.findByPk(postId)
      if (!post) {
        return res.status(404).send({ message: 'Post not found' })
      }
      post.content = content
      post.title = title
      post.pageId = pageId
      await post.save()
      return res.send(post)
    } catch (error: ValidationError | any) {
      console.error('[ERROR] Unable to update post:', error)
      return res.status(500).send(getErrorMessageFromSequelize(error))
    }
  },
}
