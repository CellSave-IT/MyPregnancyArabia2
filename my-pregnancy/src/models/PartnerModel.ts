import { Schema, model } from 'mongoose'
import { PartnerInterface } from '../interfaces'

const schema = new Schema<PartnerInterface.IPartnerDocument>(
  {
    link: { type: String, required: false },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const PartnerModel = model<PartnerInterface.IPartnerDocument>('Partners', schema)

export default PartnerModel
