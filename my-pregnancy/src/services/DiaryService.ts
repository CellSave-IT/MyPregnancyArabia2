import { Types, isValidObjectId } from 'mongoose'
import { DiaryInterface } from '../interfaces'
import DiaryModel from '../models/DiaryModel'
import removeFile from '../utils/removeFile'
const query = DiaryModel
export default {
  get: async (params: DiaryInterface.IDiaryParams) => {
    let filter = {}
    if (params?.id) {
      if (!isValidObjectId(params?.id)) {
        throw new Error('Invalid Id')
      }
      filter = { ...filter, _id: { $ne: new Types.ObjectId(params.id) } }
    }
    const items = await query
      .find(filter)
      .sort(params.orderBy === 'count' ? { count: -1 } : { createdAt: -1 })
      .limit(params.pageSize)
      .skip((params.page - 1) * params.pageSize)
      .exec()
    const count = await query.countDocuments(filter)
    return {
      items,
      totalPages: Math.ceil(count / params.pageSize),
      currentPage: params.page,
    }
  },

  store: async (data: DiaryInterface.IDiaryDocument) => {
    const responseData = await query.create({
      title: data.title,
      description: data.description,
      image: data.image,
      tag: data.tag,
    })
    return responseData
  },

  getById: async (id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const data: any = await query.findById(id)
    if (data) {
      return data
    }
    throw new Error('Invalid Id')
  },

  update: async (data: DiaryInterface.IDiaryDocument, id: string) => {
    if (data.image) {
      const find = await query.findById(id)
      if (find?.image) {
        removeFile(find.image)
      }
    }
    const responseData = await query.findByIdAndUpdate(id, { $set: data }, { new: true })
    if (!responseData) {
      throw new Error('Invalid Id')
    }
    return responseData
  },

  delete: async (id: string) => {
    const responseData = await query.findByIdAndDelete(id)
    if (responseData?.image) {
      removeFile(responseData.image)
    }
    if (!responseData) {
      throw new Error('Invalid Id')
    }
    return responseData
  },

  updateCount: async (id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const find: any = await query.findById(id)
    if (find?._id) {
      const updatedCount = parseInt(find.count || 0) + 1
      const responseData = await query.findByIdAndUpdate(id, { $set: { count: updatedCount } }, { new: true })
      return responseData
    }
    throw new Error('Invalid Id')
  },
}
