import { request } from '../api/request.js'
import { addAlert } from '../api/addAlert.js'

export const useMenuItemApi = () => {
  const createMenuItem = async (data) => {
    const [error, result] = await request('menuItems', data)
    if (error) {
      console.error('Error creating menu item:', error)
      addAlert({ key: 'create-menu', message: error.message })
      return null
    }
    return result
  }

  const getMenuItems = async () => {
    const [error, result] = await request('menuItems', undefined, 'GET')
    if (error) {
      console.error('Error fetching menu items:', error)
      addAlert({ key: 'get-menu-items', message: error.message })
      return null
    }
    return result
  }

  return {
    createMenuItem,
    getMenuItems,
  }
}
