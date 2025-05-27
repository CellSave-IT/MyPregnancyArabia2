import { Schema, model } from 'mongoose'

const schema = new Schema<any>(
  {
    group: { type: String, required: false },
    key: { type: String, required: false, unique: true },
    value: { type: String, required: false },
    title: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const GeneralSettingModel = model<any>('GeneralSettings', schema)

export default GeneralSettingModel
