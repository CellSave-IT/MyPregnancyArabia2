import { Request, Response } from 'express'
import { GeneralSettingService } from '../services'
import { response } from '../utils'
const service = GeneralSettingService
export default {
  getByKey: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await service.getByKey(req.params.key)
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
  getByGroup: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await service.getByGroup(req.params.group)
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
  createOrUpdate: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await service.createOrUpdate(req.body)
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
