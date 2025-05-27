import { Schema, model, Types } from 'mongoose'
import { CommunityInterface } from '../interfaces'

const schema = new Schema<CommunityInterface.ICommunityDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categoryId: { type: Types.ObjectId, ref: 'CommunityCategories', required: true },
  },
  {
    timestamps: true,
  }
)

const CommunityModel = model<CommunityInterface.ICommunityDocument>('Communities', schema)

export default CommunityModel
