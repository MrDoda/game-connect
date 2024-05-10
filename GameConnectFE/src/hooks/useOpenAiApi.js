import { useState } from 'react'
import { request } from './api' // Assume request function is in 'api' directory

export const useOpenAiApi = () => {
  const generatePageContent = async (data) => {
    const [error, result] = await request('openai/generate/page/content', data)
    if (error) {
      console.error('Error generating page content:', error)
      return null
    }
    return result
  }

  const generatePostContent = async (data) => {
    const [error, result] = await request('openai/generate/post/content', data)
    if (error) {
      console.error('Error generating post content:', error)
      return null
    }
    return result
  }

  return {
    generatePageContent,
    generatePostContent,
  }
}
