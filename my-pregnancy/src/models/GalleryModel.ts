import { Schema, model } from 'mongoose'
import { GalleryInterface } from '../interfaces'

const schema = new Schema<GalleryInterface.IGalleryDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
schema.virtual('images', {
  ref: 'GalleryItem',
  localField: '_id',
  foreignField: 'galleryId',
})
schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })
const GalleryModel = model<GalleryInterface.IGalleryDocument>('Galleries', schema)

export default GalleryModel
