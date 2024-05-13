import { AdminPage } from './AdminPage.jsx'
import { useLocation, useParams } from 'react-router-dom'
import { AdminPost } from './AdminPost.jsx'
import { useEffect, useState } from 'react'
import { usePageApi } from '../hooks/usePageApi.js'
import { usePostApi } from '../hooks/usePostApi.js'

export const AdminPostEdit = () => {
  const [post, setPost] = useState()
  const { id } = useParams()
  const { getPostById } = usePostApi()

  useEffect(() => {
    getPostById(id).then((p) => setPost(p))
  }, [id])

  if (!post) return null

  return <AdminPost editedPost={post} postId={post.id} />
}
