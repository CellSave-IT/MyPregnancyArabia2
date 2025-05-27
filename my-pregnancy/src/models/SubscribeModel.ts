import { Schema, model } from 'mongoose'
import { SubscribeInterface } from '../interfaces'

const schema = new Schema<SubscribeInterface.ISubscribeDocument>(
  {
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
)

const SubscribeModel = model<SubscribeInterface.ISubscribeDocument>('Subscribes', schema)

export default SubscribeModel
