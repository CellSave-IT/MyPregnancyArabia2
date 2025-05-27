import joi from 'joi'
import { AdminInterface } from '../interfaces'

const registerValidationSchema = joi.object<AdminInterface.IAdminDocument>({
  name: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
})

const loginValidationSchema = joi.object<AdminInterface.IAdminLogin>({
  username: joi.string().required(),
  password: joi.string().required(),
})
const updateValidationSchema = joi.object<AdminInterface.IAdminDocument>({
  name: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
})
export { registerValidationSchema, loginValidationSchema, updateValidationSchema }
