import joi from 'joi'
import { FaqInterface } from '../interfaces'
const validationSchema = joi.object<FaqInterface.IFaqDocument>({
  title: joi.string().required(),
  description: joi.string().required(),
})

export default validationSchema
