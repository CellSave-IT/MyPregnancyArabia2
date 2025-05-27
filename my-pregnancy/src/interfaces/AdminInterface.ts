import { Document } from 'mongoose'

export interface IAdminDocument extends Document {
  name: string
  username: string
  email: string
  password: string
}

export interface IAdminLogin {
  username: string
  password: string
}
