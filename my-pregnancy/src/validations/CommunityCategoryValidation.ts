import joi from 'joi'
import { CommunityCategoryInterface } from '../interfaces'
const validationSchema = joi.object<CommunityCategoryInterface.ICommunityCategoryDocument>({
  title: joi.string().required(),
  description: joi.string().required(),
  longDescription: joi.string().required(),
  image: joi.string().when('$method', {
    is: 'post',
    then: joi.string().optional(),
    otherwise: joi.string().optional(),
  }),
})

export default validationSchema
