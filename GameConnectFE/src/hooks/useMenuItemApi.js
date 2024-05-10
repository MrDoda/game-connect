import { request } from '../api/request.js'

export const useMenuItemApi = () => {
  const createMenuItem = async (data) => {
    const [error, result] = await request('menuItems', data)
    if (error) {
      console.error('Error creating menu item:', error)
      return null
    }
    return result
  }

  const getMenuItems = async () => {
    const [error, result] = await request('menuItems', undefined, 'GET')
    if (error) {
      console.error('Error fetching menu items:', error)
      return null
    }
    return result
  }

  return {
    createMenuItem,
    getMenuItems,
  }
}
