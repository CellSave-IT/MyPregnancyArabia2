import joi from 'joi'
import { EventInterface } from '../interfaces'
const validationSchema = joi.object<EventInterface.IEventDocument>({
  title: joi.string().required(),
  location: joi.string().required(),
  date: joi.date().required(),
  startTime: joi.string().required(),
  endTime: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().when('$method', {
    is: 'post',
    then: joi.string().required(),
    otherwise: joi.string().optional(),
  }),
  banner: joi.string().when('$method', {
    is: 'post',
    then: joi.string().required(),
    otherwise: joi.string().optional(),
  }),
  type: joi.string().required(),
  entryTypes: joi.array().items(joi.string()).min(1).required(),
  singlePrice: joi.string().optional(),
  doublePrice: joi.string().optional(),
})

export default validationSchema
