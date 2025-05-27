import joi from 'joi'
import { EnquiryInterface } from '../interfaces'
const validationSchema = joi.object<EnquiryInterface.IEnquiryDocument>({
  fName: joi.string().required(),
  lName: joi.string().required(),
  email: joi.string().email().required(),
  message: joi.string().allow(null, ''),
  phoneNo: joi.string().allow(null, ''),
  countryCode: joi.string().allow(null, ''),
})

export default validationSchema
