import joi from 'joi'
import { RegistrationInterface } from '../interfaces'
const validationSchema = joi.object<RegistrationInterface.IRegistrationDocument>({
  fName: joi.string().required(),
  lName: joi.string().required(),
  nationality: joi.string().required(),
  isPregnant: joi.boolean().required(),
  previousAttend: joi.boolean().required(),
  dueDate: joi.date().required(),
  deliveryHospital: joi.string().required(),
  doctorName: joi.string().required(),
  description: joi.string().required(),
  email: joi.string().email().required(),
  phoneNo: joi.string().required(),
  event: joi.string().required(),
  entryType: joi.string().required(),
})

export default validationSchema
