import SubscrobeModel from '../models/SubscribeModel'
import { SubscribeInterface } from '../interfaces'

const query = SubscrobeModel
export default {
  get: async (params: SubscribeInterface.ISubscribeParams) => {
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
  store: async (data: SubscribeInterface.ISubscribeDocument) => {
    const find: any = await query.findOne({ email: data.email }).exec()

    if (find?._id) {
      throw new Error('You have already subscribe')
    }
    const responseData = await query.create({
      email: data.email,
    })
    return responseData
  },
}
