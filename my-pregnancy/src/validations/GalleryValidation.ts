import joi from 'joi'
import { GalleryInterface } from '../interfaces'
const validationSchema = joi.object<GalleryInterface.IGalleryDocument>({
  title: joi.string().required(),
  description: joi.string().required(),
  images: joi.array().items().optional(),
})

export default validationSchema
