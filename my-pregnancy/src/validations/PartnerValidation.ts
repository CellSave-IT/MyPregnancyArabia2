import joi from 'joi'
import { PartnerInterface } from '../interfaces'
const validationSchema = joi.object<PartnerInterface.IPartnerDocument>({
  link: joi.string().allow('', null),
  image: joi.string().when('$method', {
    is: 'post',
    then: joi.string().required(),
    otherwise: joi.string().optional(),
  }),
})

export default validationSchema
