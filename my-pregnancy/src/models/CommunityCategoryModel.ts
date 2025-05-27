import { Schema, model } from 'mongoose'
import { CommunityCategoryInterface } from '../interfaces'

const schema = new Schema<CommunityCategoryInterface.ICommunityCategoryDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const CommunityCategoryModel = model<CommunityCategoryInterface.ICommunityCategoryDocument>('CommunityCategories', schema)

export default CommunityCategoryModel
