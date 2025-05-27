import TestimonialModel from '../models/TestimonialModel'
import { TestimonialInterface } from '../interfaces'
import removeFile from '../utils/removeFile'
const query = TestimonialModel
export default {
  get: async (params: TestimonialInterface.ITestimonialParams) => {
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

  store: async (data: TestimonialInterface.ITestimonialDocument) => {
    const responseData = await query.create({
      name: data.name,
      description: data.description,
      image: data.image,
    })
    return responseData
  },

  update: async (data: TestimonialInterface.ITestimonialDocument, id: string) => {
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
