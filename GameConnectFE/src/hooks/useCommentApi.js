import { request } from '../api/request.js'
import { addAlert } from '../api/addAlert.js'
import { appStore } from '../store/appStore.js'

export const useCommentApi = (token = appStore.getState().token) => {
  const createComment = async (data) => {
    const [error, result] = await request('comment', data, 'POST', token)
    if (error) {
      console.error('Error creating comment:', error)
      addAlert({ key: 'create-comment', message: error.message })
      return null
    }
    return result
  }

  const getCommentsByPostId = async (postId) => {
    const [error, result] = await request(
      `comment/post/${postId}`,
      undefined,
      'GET',
      token
    )
    if (error) {
      console.error(`Error fetching comments for post ID ${postId}:`, error)
      addAlert({ key: 'get-comment-by-id', message: error.message })
      return null
    }
    return result
  }

  return {
    createComment,
    getCommentsByPostId,
  }
}
