import { request } from '../api/request.js'

export const useCommentApi = () => {
  const createComment = async (data) => {
    const [error, result] = await request('comments', data)
    if (error) {
      console.error('Error creating comment:', error)
      return null
    }
    return result
  }

  const getCommentsByPostId = async (postId) => {
    const [error, result] = await request(
      `comments/post/${postId}`,
      undefined,
      'GET'
    )
    if (error) {
      console.error(`Error fetching comments for post ID ${postId}:`, error)
      return null
    }
    return result
  }

  return {
    createComment,
    getCommentsByPostId,
  }
}
