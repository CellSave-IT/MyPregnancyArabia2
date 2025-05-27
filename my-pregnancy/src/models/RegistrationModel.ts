import { Schema, model } from 'mongoose'
import { RegistrationInterface } from '../interfaces'

const schema = new Schema<RegistrationInterface.IRegistrationDocument>(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    nationality: { type: String, required: true },
    isPregnant: { type: Boolean, required: true },
    dueDate: { type: Date, required: true },
    deliveryHospital: { type: String, required: true },
    doctorName: { type: String, required: true },
    previousAttend: { type: Boolean, required: true },
    phoneNo: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Events' },
    payment: { type: Schema.Types.ObjectId, ref: 'Payments', required: false },
    description: { type: String, required: true },
    entryType: { type: String, required: true },
  },

  {
    timestamps: true,
  }
)

const RegistrationModel = model<RegistrationInterface.IRegistrationDocument>('Registrations', schema)

export default RegistrationModel
