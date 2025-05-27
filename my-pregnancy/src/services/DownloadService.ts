import { DownloadInterface } from '../interfaces'
import DownloadModel from '../models/DownloadModel'
const query = DownloadModel
export default {
  get: async (params: DownloadInterface.IDownloadParams) => {
    const items = await query
      .find()
      .sort({ createdAt: -1 })
      .limit(params.pageSize)
      .skip((params.page - 1) * params.pageSize)
      .exec()
    const count = await query.countDocuments()
    return {
      items,
      totalPages: Math.ceil(count / params.pageSize),
      currentPage: params.page,
    }
  },

  store: async (data: DownloadInterface.IDownloadDocument) => {
    const responseData = await query.create(data)
    return responseData
  },
}
