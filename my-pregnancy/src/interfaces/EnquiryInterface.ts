import { Document } from 'mongoose'
export interface IEnquiryParams {
  page: number
  pageSize: number
}

export interface IEnquiryDocument extends Document {
  fName: string
  lName: string
  email: string
  message: string
  countryCode?: string
  phoneNo?: string
}
