import { request } from '../api/request.js'

export const useUserApi = () => {
  const getLoggedUser = async () => {
    const [error, result] = await request('users/me', undefined, 'GET')
    if (error) {
      console.error('Error fetching logged user:', error)
      return null
    }
    return result
  }

  return {
    getLoggedUser,
  }
}
