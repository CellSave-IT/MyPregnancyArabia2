import { Schema, model } from 'mongoose'
import { BabySizeInterface } from '../interfaces'

const schema = new Schema<BabySizeInterface.IBabySizeDocument>(
  {
    week: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const BabySizeModel = model<BabySizeInterface.IBabySizeDocument>('BabySizes', schema)

export default BabySizeModel
