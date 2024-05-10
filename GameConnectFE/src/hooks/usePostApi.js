import { request } from '../api/request.js'
import { addAlert } from '../api/addAlert.js'

export const usePostApi = () => {
  const createPost = async (data) => {
    const [error, result] = await request('post', data)
    if (error) {
      console.error('Error creating post:', error)
      addAlert({ key: 'create-post', message: error.message })
      return null
    }
    return result
  }

  const getPosts = async () => {
    const [error, result] = await request('post', undefined, 'GET')
    if (error) {
      console.error('Error fetching posts:', error)
      addAlert({ key: 'get-posts', message: error.message })
      return null
    }
    return result
  }

  const getPostsByPageId = async (pageId) => {
    const [error, result] = await request(
      `post/page/${pageId}`,
      undefined,
      'GET'
    )
    if (error) {
      console.error(`Error fetching posts for page ${pageId}:`, error)
      addAlert({ key: 'page-by-id', message: error.message })
      return null
    }
    return result
  }

  const getPostById = async (postId) => {
    const [error, result] = await request(`post/${postId}`, undefined, 'GET')
    if (error) {
      console.error(`Error fetching post by ID ${postId}:`, error)
      addAlert({ key: 'get-post-by-id', message: error.message })
      return null
    }
    return result
  }

  return {
    createPost,
    getPosts,
    getPostsByPageId,
    getPostById,
  }
}
