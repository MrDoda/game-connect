import React, { useEffect, useState } from 'react'
import { CommentSection } from './CommentSection.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { usePostApi } from '../hooks/usePostApi.js'
import { Button } from '@mui/material'
import ReactDOM from 'react-dom/client'

export const DangerousPost = () => {
  const [post, setPost] = useState()
  const { id } = useParams()
  const { getPostById } = usePostApi()
  const navigate = useNavigate()

  useEffect(() => {
    getPostById(id).then(setPost)
    console.log('param:', id)
  }, [])

  useEffect(() => {
    if (!post) return

    const commentSection = document.getElementById('comment-section')
    if (commentSection && post) {
      ReactDOM.createRoot(commentSection).render(
        <CommentSection postId={post.id} />
      )
    }
  }, [post])

  if (!post) return null

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Go back</Button>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}
