import User from './user.model'
import { ResultPromise } from '../../types/common.types'
import type Express from 'express'

export const UserService = {
  getUserByEmail: async (email: string) => {
    try {
      return await User.findOne({
        where: {
          email,
        },
      })
    } catch (error) {
      console.error('[ERROR]UserService.getUserByEmailAndPassword', error)
    }
  },

  createUser: async (user: Partial<User>): ResultPromise<User> => {
    try {
      if (!user?.email) {
        return [{ message: 'Email is required' }, null]
      }

      const foundUser = await User.findOne({ where: { email: user?.email } })

      if (foundUser) {
        return [{ message: 'Email already exists' }, null]
      }

      return [null, await User.create(user)]
    } catch (error) {
      console.error('[ERROR]UserService.createUser', error)
    }

    return [{ message: 'Error creating user' }, null]
  },

  getLoggedUser: (req: Express.Request, res: Express.Response) => {
    if (req.user) {
      return res.send(req.user)
    }
  },
}
