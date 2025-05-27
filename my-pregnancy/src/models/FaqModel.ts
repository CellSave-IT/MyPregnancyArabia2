import { Schema, model } from 'mongoose'
import { FaqInterface } from '../interfaces'

const schema = new Schema<FaqInterface.IFaqDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const FaqModel = model<FaqInterface.IFaqDocument>('Faqs', schema)

export default FaqModel
