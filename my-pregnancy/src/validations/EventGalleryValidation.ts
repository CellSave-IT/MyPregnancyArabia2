import joi from 'joi'

const validationSchema = joi.object<any>({
  images: joi.array().items(joi.string()).required(),
})

export default validationSchema
