import { Schema, model } from 'mongoose'
import { DownloadInterface } from '../interfaces'

const schema = new Schema<DownloadInterface.IDownloadDocument>(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    deliveryHospital: { type: String, required: true },
    countryCode: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const DownloadModel = model<DownloadInterface.IDownloadDocument>('Downloads', schema)

export default DownloadModel
