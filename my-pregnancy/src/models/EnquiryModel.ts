import { Schema, model } from 'mongoose'
import { EnquiryInterface } from '../interfaces'

const schema = new Schema<EnquiryInterface.IEnquiryDocument>(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    countryCode: { type: String, required: false },
    phoneNo: { type: String, required: false },
    message: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const EnquiryModel = model<EnquiryInterface.IEnquiryDocument>('Enquiry', schema)

export default EnquiryModel
