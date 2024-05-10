import { AdminPage } from './AdminPage.jsx'
import { useLocation } from 'react-router-dom'
import { AdminPost } from './AdminPost.jsx'

export const AdminPostEdit = () => {
  // TBD load & pass page

  return <AdminPost editedPost={post} postId={post.id} />
}
