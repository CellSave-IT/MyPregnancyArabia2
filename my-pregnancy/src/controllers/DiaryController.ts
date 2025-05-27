import { Request, Response } from 'express'
import { DiaryService } from '../services'
import { DiaryValidation } from '../validations'
import { response } from '../utils'
const service = DiaryService
const validation = DiaryValidation
export default {
  get: async (req: Request, res: Response): Promise<void> => {
    try {
      const params: any = req.query
      const data = await service.get({
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        orderBy: params.orderBy,
        id: params.id || null,
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
  updateCount: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await service.updateCount(req.params.id)
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
