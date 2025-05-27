import { Document } from 'mongoose'

export interface ICommunityDocument extends Document {
  title: string
  description: string
  image: string
  categoryId: any
  communityCategories: any
}

export interface ICommunityParams {
  page: number
  pageSize: number
  categoryId?: string
  id?: string
}
