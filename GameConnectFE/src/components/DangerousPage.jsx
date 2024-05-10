import React, { useEffect, useState } from 'react'
import { PostList } from './PostsList.jsx'
import ReactDOM from 'react-dom/client'
import { usePageApi } from '../hooks/usePageApi.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { GeneratedMenu } from './GeneratedMenu.jsx'

let reactRoot = null
let reactRootMenu = null

export const DangerousPage = () => {
  const [page, setPage] = useState()
  const location = useLocation()
  const { getPageByURL } = usePageApi()

  const navigate = useNavigate()

  useEffect(() => {
    getPageByURL(location.pathname).then(setPage)
  }, [location])

  useEffect(() => {
    if (!page) return

    const postSection = document.getElementById('posts-section')
    const menuSection = document.getElementsByTagName('nav')?.[0]

    if (postSection && page) {
      ReactDOM.createRoot(postSection).render(
        <PostList page={page} navigate={navigate} />
      )
    }

    if (menuSection && page) {
      ReactDOM.createRoot(menuSection).render(
        <GeneratedMenu navigate={navigate} />
      )
    }
  }, [page])

  if (!page) return null

  return <div dangerouslySetInnerHTML={{ __html: page.content }} />
}
