import { Request, Response } from 'express'
import AdminService from '../services/AdminService'
import { AdminValidation } from '../validations'
import { response } from '../utils'
const service = AdminService
const validation = AdminValidation
export default {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { value, error } = validation.loginValidationSchema.validate(req.body)
      if (error) {
        response.error({
          res,
          message: error.details[0].message,
          status: 422,
          errors: error.details?.map((item) => item?.message),
        })
      } else {
        const data = await service.login(value)
        response.success({
          res,
          status: 200,
          data,
        })
      }
    } catch (err: any) {
      response.error({
        res,
        message: err.message,
        status: err.status || 500,
      })
    }
  },
  get: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await service.get()
      response.success({
        res,
        status: 200,
        data,
      })
    } catch (err: any) {
      response.error({
        res,
        message: err.message,
        status: err.status || 500,
      })
    }
  },
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { value, error } = validation.updateValidationSchema.validate(req.body)
      if (error) {
        response.error({
          res,
          message: error.details[0].message,
          status: 422,
          errors: error.details?.map((item) => item?.message),
        })
      } else {
        const data = await service.update(req.body, req?.params?.id)
        response.success({
          res,
          status: 200,
          data,
        })
      }
    } catch (err: any) {
      response.error({
        res,
        message: err.message,
        status: err.status || 500,
      })
    }
  },
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { value, error } = validation.registerValidationSchema.validate(req.body)
      if (error) {
        response.error({
          res,
          message: error.details[0].message,
          status: 422,
          errors: error.details?.map((item) => item?.message),
        })
      } else {
        const data = await service.register(value)
        response.success({
          res,
          status: 200,
          data,
        })
      }
    } catch (err: any) {
      response.error({
        res,
        message: err.message,
        status: err.status || 500,
      })
    }
  },
}
