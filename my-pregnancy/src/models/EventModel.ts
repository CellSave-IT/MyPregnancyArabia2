import { Schema, model } from 'mongoose'
import { EventInterface } from '../interfaces'
enum Types {
  Free = 'Free',
  Paid = 'Paid',
}
const schema = new Schema<EventInterface.IEventDocument>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    banner: { type: String, required: false },
    type: { type: String, enum: Object.values(Types), default: Types.Free },
    singlePrice: { type: String, required: false },
    doublePrice: { type: String, required: false },
    entryType: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const EventModel = model<EventInterface.IEventDocument>('Events', schema)

export default EventModel
