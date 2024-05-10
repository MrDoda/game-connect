import { request } from '../api/request.js'
import { addAlert } from '../api/addAlert.js'

export const useOpenAiApi = () => {
  const generatePageContent = async (data) => {
    const [error, result] = await request('openai/generate/page/content', data)
    if (error) {
      console.error('Error generating page content:', error)
      addAlert({ key: 'generate-page-error', message: error.message })
      return null
    }
    return result
  }

  const generatePostContent = async (data) => {
    const [error, result] = await request('openai/generate/post/content', data)
    if (error) {
      console.error('Error generating post content:', error)
      addAlert({ key: 'generate-post-error', message: error.message })
      return null
    }
    return result
  }

  return {
    generatePageContent,
    generatePostContent,
  }
}
