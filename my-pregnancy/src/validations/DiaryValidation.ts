import joi from 'joi'
import { DiaryInterface } from '../interfaces'
const validationSchema = joi.object<DiaryInterface.IDiaryDocument>({
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().when('$method', {
    is: 'post',
    then: joi.string().required(),
    otherwise: joi.string().optional(),
  }),
  tag: joi.string().required(),
})

export default validationSchema
