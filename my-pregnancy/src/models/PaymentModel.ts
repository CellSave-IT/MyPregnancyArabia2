import { Schema, model } from 'mongoose'
enum Status {
  Pending = 'Pending',
  Paid = 'Paid',
  Failed = 'Failed',
}
const schema = new Schema<any>(
  {
    info: { type: String, required: true },
    status: { type: String, enum: Object.values(Status), default: Status.Pending },
    amount: { type: Number, required: true },
    regestrationId: { type: String, required: true },
    ref: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
)

const PaymentModel = model<any>('Payments', schema)

export default PaymentModel
