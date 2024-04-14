import type Express from 'express'
import Comment from './comment.model'

export const CommentService = {
  createComment: async (req: Express.Request, res: Express.Response) => {
    const { content, postId } = req.body

    const ownerId = req.user?.id

    try {
      const newComment = await Comment.create({
        content,
        postId,
        ownerId,
      })

      return res.status(201).send(newComment)
    } catch (error) {
      console.error('[ERROR] Failed to create comment:', error)
      return res.status(500).send({ message: 'Failed to create comment' })
    }
  },

  getCommentsByPostId: async (req: Express.Request, res: Express.Response) => {
    const postId = parseInt(req.params.postId)
    if (!postId) {
      return res.status(400).send({ message: 'Invalid post ID provided' })
    }

    try {
      const comments = await Comment.findAll({
        where: {
          postId: postId,
        },
      })

      if (comments.length > 0) {
        return res.send(comments)
      } else {
        return res
          .status(404)
          .send({ message: 'No comments found for the given post' })
      }
    } catch (error) {
      console.error('[ERROR] Failed to retrieve comments:', error)
      return res.status(500).send({ message: 'Error retrieving comments' })
    }
  },
}
