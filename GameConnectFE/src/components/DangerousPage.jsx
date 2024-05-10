import React, { useEffect } from 'react'
import { PostList } from './PostsList.jsx'
import { CommentSection } from './CommentSection.jsx'
import ReactDOM from 'react-dom/client'

export const DangerousPage = () => {
  useEffect(() => {
    const page = { id: 1, title: 'Post title', content: 'Post content' }

    const postSection = document.getElementById('posts-section')

    if (postSection && page) {
      ReactDOM.createRoot(<PostList page={page} />, postSection)
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
