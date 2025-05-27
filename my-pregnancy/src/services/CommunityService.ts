import { Types, isValidObjectId } from 'mongoose'
import { CommunityInterface } from '../interfaces'
import CommunityModel from '../models/CommunityModel'
import removeFile from '../utils/removeFile'
const query = CommunityModel
export default {
  get: async (params: CommunityInterface.ICommunityParams) => {
    let filter = {}
    if (params.categoryId) {
      filter = { categoryId: new Types.ObjectId(params.categoryId) }
    }
    if (params?.id) {
      if (!isValidObjectId(params?.id)) {
        throw new Error('Invalid Id')
      }
      filter = { ...filter, _id: { $ne: new Types.ObjectId(params.id) } }
    }

    const items = await query
      .find(filter)
      .populate('categoryId')
      .sort({ createdAt: -1 })
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

  store: async (data: CommunityInterface.ICommunityDocument) => {
    const responseData = await query.create({
      title: data.title,
      description: data.description,
      image: data.image,
      categoryId: new Types.ObjectId(data.categoryId),
    })
    return responseData
  },

  getById: async (id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const data: any = await query.findById(id).populate('categoryId')

    if (data) {
      return data
    }
    throw new Error('Invalid Id')
  },

  update: async (data: CommunityInterface.ICommunityDocument, id: string) => {
    if (data.categoryId) {
      data.categoryId = new Types.ObjectId(data.categoryId)
    }
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
}
