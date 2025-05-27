import { Document } from 'mongoose'

export interface IBabySizeDocument extends Document {
  week: number
  description: string
  image: string
}
