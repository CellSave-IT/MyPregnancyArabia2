import { Document } from 'mongoose'

export interface ICommunityCategoryDocument extends Document {
  title: string
  description: string
  longDescription: string
  image: string
}

export interface ICommunityCategoryParams {
  page: number
  pageSize: number
}
