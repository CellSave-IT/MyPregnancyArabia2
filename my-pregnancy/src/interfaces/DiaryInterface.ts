import { Document } from 'mongoose'

export interface IDiaryDocument extends Document {
  title: string
  description: string
  image: string
  tag: string
  count: number
}

export interface IDiaryParams {
  page: number
  pageSize: number
  orderBy?: string
  id?: string
}
