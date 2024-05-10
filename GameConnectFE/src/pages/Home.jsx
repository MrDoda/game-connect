import { Navigate } from 'react-router-dom'

export const Home = () => {
  const doesHomePageExist = false
  if (!doesHomePageExist) {
    return <Navigate to={'/login'} replace />
  }
  return <div>Home</div>
}
