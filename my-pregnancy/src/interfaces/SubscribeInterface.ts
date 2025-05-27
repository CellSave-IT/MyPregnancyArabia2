import { Document } from 'mongoose'
export interface ISubscribeParams {
  page: number
  pageSize: number
}

export interface ISubscribeDocument extends Document {
  email: string
}
