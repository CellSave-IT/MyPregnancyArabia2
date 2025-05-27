import { Document } from 'mongoose'
export interface IGalleryParams {
  page: number
  pageSize: number
}

export interface IGalleryDocument extends Document {
  title: string
  description: string
  images?: any[]
}
