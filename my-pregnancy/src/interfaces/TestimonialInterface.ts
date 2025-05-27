import { Document } from 'mongoose'
export interface ITestimonialParams {
  page: number
  pageSize: number
}

export interface ITestimonialDocument extends Document {
  name: string
  description: string
  image?: string
}
