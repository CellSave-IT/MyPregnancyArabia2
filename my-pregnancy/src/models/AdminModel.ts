import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { AdminInterface } from '../interfaces'
const schema = new Schema<AdminInterface.IAdminDocument>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err: any) {
    next(err)
  }
})
schema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password)
}
schema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.password
    return ret
  },
})
const AdminModel = model<AdminInterface.IAdminDocument>('Admins', schema)

export default AdminModel
