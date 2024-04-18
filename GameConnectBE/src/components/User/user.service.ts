import User from './user.model'
import { ResultPromise } from '../../types/common.types'
import type Express from 'express'
import { getErrorMessageFromSequelize } from '../../utils/getErrorMessageFromSequelize'
import { ValidationError } from 'sequelize'
import { ERROR_PREFIXES } from '../../constants/errorPrefixes'

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
      return [null, await User.create(user)]
    } catch (error: ValidationError | any) {
      console.error('[USER_ERROR]UserService.createUser', error)
      return [
        getErrorMessageFromSequelize(
          error,
          `Error creating user`,
          ERROR_PREFIXES.USER
        ),
        null,
      ]
    }
  },

  getLoggedUser: async (req: Express.Request, res: Express.Response) => {
    if (req.user) {
      try {
        const loggedUser = await User.findOne({
          attributes: { exclude: ['password'] },
          where: {
            id: req.user.id,
            email: req.user.email,
          },
        })

        if (!loggedUser) {
          return res
            .status(404)
            .send({ message: `${ERROR_PREFIXES.USER} User not found` })
        }

        return res.send(loggedUser)
      } catch (error: ValidationError | any) {
        console.error('[USER_ERROR]UserService.createUser', error)
        return res
          .status(400)
          .send(
            getErrorMessageFromSequelize(
              error,
              `Error getting user`,
              ERROR_PREFIXES.USER
            )
          )
      }
    }

    return res
      .status(404)
      .send({ message: `${ERROR_PREFIXES.USER} User not found` })
  },
}
