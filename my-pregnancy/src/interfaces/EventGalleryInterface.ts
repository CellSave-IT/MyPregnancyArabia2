import { Document } from 'mongoose'
export interface IEventGalleryParams {
  page: number
  pageSize: number
}

export interface IEventGalleryDocument extends Document {
  image: string
  eventId: any
}
