import { Document } from 'mongoose'
export interface IFaqParams {
  page: number
  pageSize: number
}

export interface IFaqDocument extends Document {
  title: string
  description: string
}
