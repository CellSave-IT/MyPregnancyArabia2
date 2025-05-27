import joi from 'joi'
import { CommunityInterface } from '../interfaces'
const validationSchema = joi.object<CommunityInterface.ICommunityDocument>({
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().when('$method', {
    is: 'post',
    then: joi.string().required(),
    otherwise: joi.string().optional(),
  }),
  categoryId: joi.string().required(),
})

export default validationSchema
