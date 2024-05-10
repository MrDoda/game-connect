import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DangerousPage } from '../components/DangerousPage.jsx'
import { usePageApi } from '../hooks/usePageApi.js'

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [doesHomePageExist, setExistingHomePage] = useState(false)

  const { getPageByURL } = usePageApi()

  useEffect(() => {
    getPageByURL('/').then((res) => {
      setExistingHomePage(!!res)
      setIsLoading(false)
    })
  }, [])

  if (!doesHomePageExist && !isLoading) {
    return <Navigate to={'/login'} replace />
  }

  if (!doesHomePageExist) return null

  return <DangerousPage />
}
