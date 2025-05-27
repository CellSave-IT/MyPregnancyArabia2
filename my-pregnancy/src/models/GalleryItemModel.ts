import { Schema, model, Types } from 'mongoose'

const schema = new Schema<any>(
  {
    image: { type: String, required: true },
    galleryId: { type: Types.ObjectId, ref: 'Galleries', required: true },
  },
  {
    timestamps: true,
  }
)

const GalleryItemModel = model<any>('GalleryItem', schema)

export default GalleryItemModel
