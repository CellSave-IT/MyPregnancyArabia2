import jwt from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'
import { AdminInterface } from '../interfaces'
import AdminModel from '../models/AdminModel'
const query = AdminModel
export default {
  get: async () => query.find(),
  login: async (data: AdminInterface.IAdminLogin) => {
    const { username, password } = data
    const user: any = await query.findOne({ username })
    if (!user) {
      throw new Error('Invalid Credentials')
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw new Error('Invalid Credentials')
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      token,
    }
  },
  register: async (data: AdminInterface.IAdminDocument) => {
    const { username, ...rest } = data
    const user: any = await query.findOne({ username })
    if (user) {
      throw new Error('User already exist with this username')
    }
    const response = query.create({
      name: rest.name,
      username,
      email: rest.email,
      password: rest.password,
    })
    return response
  },
  update: async (data: AdminInterface.IAdminDocument, id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const response = await query.findByIdAndUpdate(id, { $set: data }, { new: true })

    return response
  },
}
