import { Request, Response } from 'express'
import { CommunityCategoryService } from '../services'
import { CommuintyCategoryValidation } from '../validations'
import { response } from '../utils'
const service = CommunityCategoryService
const validation = CommuintyCategoryValidation
export default {
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
        status: 500,
      })
    }
  },
  store: async (req: Request, res: Response): Promise<void> => {
    try {
      const { value, error } = validation.validate(req.body, { context: { method: 'post' } })
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
  update: async (req: Request, res: Response): Promise<void> => {
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
        const data = await service.update(value, req.params.id)
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
  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await service.getById(req.params.id)
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

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await service.delete(req.params.id)
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
}
