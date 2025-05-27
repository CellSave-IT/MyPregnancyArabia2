import { isValidObjectId } from 'mongoose'
import GalleryModel from '../models/GalleryModel'
import GalleryItemModel from '../models/GalleryItemModel'
import { GalleryInterface } from '../interfaces'
import removeFile from '../utils/removeFile'
const query = GalleryModel
export default {
  get: async (params: GalleryInterface.IGalleryParams) => {
    const items = await query
      .find()
      .populate('images')
      .sort({ createdAt: 1 })
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

  store: async (data: GalleryInterface.IGalleryDocument) => {
    const responseData = await query.create({
      title: data.title,
      description: data.description,
    })
    if (data?.images?.length) {
      const images = data?.images?.map((image) => ({
        image,
        galleryId: responseData._id,
      }))
      await GalleryItemModel.insertMany(images)
    }
    return responseData
  },

  update: async (data: GalleryInterface.IGalleryDocument, id: string) => {
    const responseData = await query.findByIdAndUpdate(id, { $set: data }, { new: true })
    if (data?.images?.length) {
      const images = data?.images?.map((image) => ({
        image,
        galleryId: id,
      }))
      await GalleryItemModel.insertMany(images)
    }
    if (!responseData) {
      throw new Error('Invalid Id')
    }
    return responseData
  },

  getById: async (id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const data: any = await query.findById(id).populate('images').exec()
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
    if (!responseData) {
      throw new Error('Invalid Id')
    }
    return responseData
  },

  deleteImage: async (id: string) => {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Id')
    }
    const responseData = await GalleryItemModel.findByIdAndDelete(id)
    if (responseData?.image) {
      removeFile(responseData.image)
    }
    if (!responseData) {
      throw new Error('Invalid Id')
    }
    return responseData
  },
}
