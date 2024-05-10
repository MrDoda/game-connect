import { request } from '../api/request.js'

export const usePageApi = () => {
  const createPage = async (data) => {
    const [error, result] = await request('pages', data)
    if (error) {
      console.error('Error creating page:', error)
      return null
    }
    return result
  }

  const getPages = async () => {
    const [error, result] = await request('pages', undefined, 'GET')
    if (error) {
      console.error('Error fetching pages:', error)
      return null
    }
    return result
  }

  const getPageByURL = async (url) => {
    const [error, result] = await request(
      `pages/url/?url=${encodeURIComponent(url)}`,
      undefined,
      'GET'
    )
    if (error) {
      console.error(`Error fetching page by URL ${url}:`, error)
      return null
    }
    return result
  }

  return {
    createPage,
    getPages,
    getPageByURL,
  }
}
