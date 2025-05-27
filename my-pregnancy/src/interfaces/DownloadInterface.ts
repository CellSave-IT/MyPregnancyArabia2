import { Document } from 'mongoose'

export interface IDownloadDocument extends Document {
  fName: string
  lName: string
  date: Date
  email: string
  phoneNo: string
  deliveryHospital: string
  countryCode: string
}

export interface IDownloadParams {
  page: number
  pageSize: number
}
