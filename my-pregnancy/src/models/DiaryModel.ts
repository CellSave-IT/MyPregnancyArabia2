import { Schema, model } from 'mongoose'
import { DiaryInterface } from '../interfaces'

const schema = new Schema<DiaryInterface.IDiaryDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: String, required: true },
    count: { type: Number, required: false, defaultValue: 0 },
  },
  {
    timestamps: true,
  }
)

const DiaryModel = model<DiaryInterface.IDiaryDocument>('Diaries', schema)

export default DiaryModel
