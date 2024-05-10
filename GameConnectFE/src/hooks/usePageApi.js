import { request } from '../api/request.js'
import { addAlert } from '../api/addAlert.js'

export const usePageApi = () => {
  const createPage = async (data) => {
    const [error, result] = await request('page', data)
    if (error) {
      console.error('Error creating page:', error)
      addAlert({ key: 'create-page', message: error.message })
      return null
    }
    return result
  }

  const getPages = async () => {
    const [error, result] = await request('page', undefined, 'GET')
    if (error) {
      console.error('Error fetching pages:', error)
      addAlert({ key: 'get-pages', message: error.message })
      return null
    }
    return result
  }

  const getPageByURL = async (url) => {
    const [error, result] = await request(
      `page/url/?url=${encodeURIComponent(url)}`,
      undefined,
      'GET'
    )
    if (error) {
      console.error(`Error fetching page by URL ${url}:`, error)
      addAlert({ key: 'get-page-by-url', message: error.message })
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
