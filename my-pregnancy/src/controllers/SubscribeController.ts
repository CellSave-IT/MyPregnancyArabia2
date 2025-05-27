import { Request, Response } from 'express'
import { response } from '../utils'
import { SubscribeService } from '../services'
import { SubscribeValidation } from '../validations'
const service = SubscribeService
const validation = SubscribeValidation
export default {
  get: async (req: Request, res: Response): Promise<void> => {
    try {
      const params: any = req.query
      const data = await service.get({
        page: params.page || 1,
        pageSize: params.pageSize || 10,
      })
      response.success({
        res,
        status: 200,
        data,
      })
    } catch (err: any) {
      response.error({
        res,
        message: err.message,
        status: 500,
      })
    }
  },
  store: async (req: Request, res: Response): Promise<void> => {
    try {
      const { value, error } = validation.validate(req.body)
      if (error) {
        response.error({
          res,
          message: error.details[0].message,
          status: 422,
          errors: error.details?.map((item) => item?.message),
        })
      } else {
        const data = await service.store(value)
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
        status: 500,
      })
    }
  },
}
