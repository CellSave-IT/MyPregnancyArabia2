import joi from 'joi'
import { SubscribeInterface } from '../interfaces'
const validationSchema = joi.object<SubscribeInterface.ISubscribeDocument>({
  email: joi.string().email().required(),
})

export default validationSchema
