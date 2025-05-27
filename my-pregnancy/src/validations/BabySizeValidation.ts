import joi from 'joi'
import { BabySizeInterface } from '../interfaces'
const validationSchema = joi.object<BabySizeInterface.IBabySizeDocument>({
  week: joi.number().required(),
  description: joi.string().required(),
  image: joi.string().when('$method', {
    is: 'post',
    then: joi.string().required(),
    otherwise: joi.string().optional(),
  }),
})

export default validationSchema
