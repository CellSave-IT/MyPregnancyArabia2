import joi from 'joi'
import { TestimonialInterface } from '../interfaces'
const validationSchema = joi.object<TestimonialInterface.ITestimonialDocument>({
  name: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().when('$method', {
    is: 'post',
    then: joi.string().optional(),
    otherwise: joi.string().optional(),
  }),
})

export default validationSchema
