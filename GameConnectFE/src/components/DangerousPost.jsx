import React, { useEffect } from 'react'
import { PostList } from './PostsList.jsx'
import { CommentSection } from './CommentSection.jsx'
import ReactDOM from 'react-dom/client'

export const DangerousPost = () => {
  useEffect(() => {
    const post = { id: 1, title: 'Post title', content: 'Post content' }

    const commentSection = document.getElementById('comment-section')
    if (commentSection && post) {
      ReactDOM.createRoot(<CommentSection post={post} />, commentSection)
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
