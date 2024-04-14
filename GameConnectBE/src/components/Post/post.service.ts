import Post from './post.model'
import type Express from 'express'

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

  getPosts: async (req: Express.Request, res: Express.Response) => {
    try {
      const ownerId = req.user?.id

      const posts = await Post.findAll({
        where: {
          ownerId: ownerId,
        },
      })

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
}
