import { request } from '../api/request.js'

export const useAuthentication = () => {
  const login = async (credentials) => {
    const [error, result] = await request('auth/login', credentials)
    if (error) {
      console.error('Error logging in:', error)
      return null
    }
    return result
  }

  const register = async (userDetails) => {
    const [error, result] = await request('auth/register', userDetails)
    if (error) {
      console.error('Error registering:', error)
      return null
    }
    return result
  }

  return {
    login,
    register,
  }
}
