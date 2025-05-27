import { Document, Types } from 'mongoose'
export interface IRegistrationParams {
  page: number
  pageSize: number
  event: string
}

export interface IRegistrationDocument extends Document {
  fName: string
  lName: string
  nationality: string
  isPregnant: boolean
  dueDate: Date
  deliveryHospital: string
  doctorName: string
  email: string
  previousAttend: boolean
  description: string
  event: any
  phoneNo: string
  payment: any
  entryType: string
}
