import { useEffect, useState } from 'react'
import { usePageApi } from '../hooks/usePageApi.js'
import { Link } from 'react-router-dom'

export const GeneratedMenu = ({ navigate }) => {
  const [pages, setPages] = useState([])

  const { getPages } = usePageApi()

  useEffect(() => {
    getPages().then((pages) => setPages(pages || []))
  }, [])
  return (
    <nav>
      <ul>
        {pages &&
          pages.map((page) => (
            <li key={page.id}>
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(page.url)}
              >
                {page.title}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  )
}
