import { AdminPage } from './AdminPage.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePageApi } from '../hooks/usePageApi.js'

export const AdminPageEdit = () => {
  const [page, setPage] = useState()
  const { id } = useParams()
  const { getPageById } = usePageApi()

  useEffect(() => {
    getPageById(id).then((page) => setPage(page))
  }, [id])

  if (!page) return null

  return <AdminPage editedPage={page} pageId={page.id} />
}
