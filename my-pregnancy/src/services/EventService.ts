import { Types, isValidObjectId } from 'mongoose'
import EventModel from '../models/EventModel'
import { EventInterface } from '../interfaces'
import removeFile from '../utils/removeFile'
const query = EventModel
export default {
  get: async (params: EventInterface.IEventParams) => {
    let filter = {}
    filter = params.type === 'Upcoming' ? { date: { $gte: new Date() } } : params.type === 'Past' ? { date: { $lte: new Date() } } : {}
    if (params?.id) {
      if (!isValidObjectId(params?.id)) {
        throw new Error('Invalid Id')
      }
      filter = { ...filter, _id: { $ne: new Types.ObjectId(params.id) } }
    }

    const items = await query
      .find(filter)
      .sort({ date: -1 })
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

  store: async (data: EventInterface.IEventDocument) => {
    let entryType = null
    if (data?.entryTypes.includes('single') && data.entryTypes.includes('double')) {
      entryType = 'both'
    } else if (data.entryTypes.includes('single')) {
      entryType = 'single'
    } else {
      entryType = 'double'
    }

    const responseData = await query.create({
      title: data.title,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      description: data.description,
      image: data.image,
      banner: data?.banner,
      type: data.type,
      singlePrice: data.singlePrice || null,
      doublePrice: data.doublePrice || null,
      entryType,
    })
    return responseData
  },

  update: async (data: EventInterface.IEventDocument, id: string) => {
    const { entryTypes, ...filterData } = data
    let entryType = null
    if (data?.entryTypes.includes('single') && data.entryTypes.includes('double')) {
      entryType = 'both'
    } else if (data.entryTypes.includes('single')) {
      entryType = 'single'
    } else {
      entryType = 'double'
    }

    const responseData = await query.findByIdAndUpdate(
      id,
      {
        $set: {
          ...filterData,
          entryType,
        },
      },
      { new: true }
    )
    if (!responseData) {
      throw new Error('Invalid Id')
    }
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

  delete: async (id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const responseData = await query.findByIdAndDelete(id)
    if (responseData?.image) {
      removeFile(responseData.image)
    }
    if (responseData?.banner) {
      removeFile(responseData.banner)
    }
    if (!responseData) {
      throw new Error('Invalid Id')
    }
    return responseData
  },
}
