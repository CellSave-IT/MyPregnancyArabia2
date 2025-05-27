import { Document } from 'mongoose'
export interface IPartnerDocument extends Document {
  link: string
  image: string
}
