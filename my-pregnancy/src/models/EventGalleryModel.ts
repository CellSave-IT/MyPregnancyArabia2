import { Schema, model, Types } from 'mongoose'
import { EventGalleryInterface } from '../interfaces'

const schema = new Schema<EventGalleryInterface.IEventGalleryDocument>(
  {
    image: { type: String, required: true },
    eventId: { type: Types.ObjectId, ref: 'Events', required: true },
  },
  {
    timestamps: true,
  }
)

const EventModel = model<EventGalleryInterface.IEventGalleryDocument>('EventGalleries', schema)

export default EventModel
