import { Types, isValidObjectId } from 'mongoose'
import EventGalleryModel from '../models/EventGalleryModel'
import { EventGalleryInterface } from '../interfaces'
import removeFile from '../utils/removeFile'
const query = EventGalleryModel
export default {
  get: async (id: string, params: EventGalleryInterface.IEventGalleryParams) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const items = await query
      .find({
        eventId: new Types.ObjectId(id),
      })
      .sort({ createdAt: -1 })
      .limit(params.pageSize)
      .skip((params.page - 1) * params.pageSize)
      .exec()
    const count = await query.countDocuments({
      eventId: new Types.ObjectId(id),
    })
    return {
      items,
      totalPages: Math.ceil(count / params.pageSize),
      currentPage: params.page,
    }
  },

  store: async (data: any, id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const formatData = data?.images?.map((image: any) => ({
      image,
      eventId: new Types.ObjectId(id),
    }))

    const responseData = await query.insertMany(formatData)
    return responseData
  },

  delete: async (id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
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
