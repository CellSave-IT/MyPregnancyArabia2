import { Document } from 'mongoose'
export interface IEventParams {
  page: number
  pageSize: number
  type: 'All' | 'Upcoming' | 'Past'
  id?: string
}

export interface IEventDocument extends Document {
  title: string
  description: string
  image?: string
  banner?: string
  location: string
  date: Date
  startTime: string
  endTime: string
  type: string
  singlePrice?: string
  doublePrice?: string
  entryType: string
  entryTypes: string[]
}
