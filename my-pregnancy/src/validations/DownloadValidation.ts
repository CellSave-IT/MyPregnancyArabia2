import joi from 'joi'
import { DownloadInterface } from '../interfaces'
const validationSchema = joi.object<DownloadInterface.IDownloadDocument>({
  fName: joi.string().required(),
  lName: joi.string().required(),
  email: joi.string().email().required(),
  phoneNo: joi.string().required(),
  date: joi.date().required(),
  deliveryHospital: joi.string().required(),
  countryCode: joi.string().required(),
})

export default validationSchema
