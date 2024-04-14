import type Express from 'express'
import { UserService } from '../User/user.service'
import jwt from 'jsonwebtoken'

export const AuthService = {
  login: async (req: Express.Request, res: Express.Response) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const encryptedPassword = `encryptedPswrd:${password}`

    const user = await UserService.getUserByEmailAndPassword(
      email,
      encryptedPassword
    )

    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET || 'secret', {
        expiresIn: '24h',
      })

      return res.send({ token })
    }

    return res.status(401).json({ message: 'Invalid email or password' })
  },

  register: async (req: Express.Request, res: Express.Response) => {
    const { password, ...user } = req.body

    user.password = `encryptedPswrd:${password}`
    const newUser = await UserService.createUser(user)

    if (newUser) {
      return res.status(201).json({ message: 'User created successfully' })
    }

    return res.status(500).json({ message: 'Error creating user' })
  },
}
