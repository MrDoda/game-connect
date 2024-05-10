import { request } from '../api/request.js'

export const usePostApi = () => {
  const createPost = async (data) => {
    const [error, result] = await request('posts', data)
    if (error) {
      console.error('Error creating post:', error)
      return null
    }
    return result
  }

  const getPosts = async () => {
    const [error, result] = await request('posts', undefined, 'GET')
    if (error) {
      console.error('Error fetching posts:', error)
      return null
    }
    return result
  }

  const getPostsByPageId = async (pageId) => {
    const [error, result] = await request(
      `posts/page/${pageId}`,
      undefined,
      'GET'
    )
    if (error) {
      console.error(`Error fetching posts for page ${pageId}:`, error)
      return null
    }
    return result
  }

  const getPostById = async (postId) => {
    const [error, result] = await request(`posts/${postId}`, undefined, 'GET')
    if (error) {
      console.error(`Error fetching post by ID ${postId}:`, error)
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
