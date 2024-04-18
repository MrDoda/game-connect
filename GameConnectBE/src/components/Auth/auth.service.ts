import type Express from 'express'
import { UserService } from '../User/user.service'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { ERROR_PREFIXES } from '../../constants/errorPrefixes'

export const AuthService = {
  login: async (req: Express.Request, res: Express.Response) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({
        message: `${ERROR_PREFIXES.AUTH} Email and password are required`,
      })
    }

    const user = await UserService.getUserByEmail(email)

    if (!user || !AuthService.verifyPassword(password, user.password)) {
      return res
        .status(401)
        .send({ message: `${ERROR_PREFIXES.AUTH} Invalid email or password` })
    }

    if (user) {
      const { password, ...userToken } = user.get()
      const token = jwt.sign(userToken, process.env.JWT_SECRET || 'secret', {
        expiresIn: '24h',
      })

      return res.send({ token })
    }

    return res
      .status(401)
      .send({ message: `${ERROR_PREFIXES.AUTH} Invalid email or password` })
  },

  register: async (req: Express.Request, res: Express.Response) => {
    const { password, name, email } = req.body

    const [errorType, newUser] = await UserService.createUser({
      name,
      email,
      password: AuthService.hashPassword(password),
    })

    if (errorType) {
      return res.status(400).send(errorType)
    }

    if (newUser) {
      return res.status(201).send({ message: 'User created successfully' })
    }

    return res
      .status(500)
      .send({ message: `${ERROR_PREFIXES.AUTH} Error creating user` })
  },

  hashPassword: (password: string) => {
    return bcrypt.hashSync(process.env.SALT + password + process.env.PEPPER, 10)
  },

  verifyPassword: (password: string, hash: string) => {
    return bcrypt.compareSync(
      process.env.SALT + password + process.env.PEPPER,
      hash
    )
  },
}
