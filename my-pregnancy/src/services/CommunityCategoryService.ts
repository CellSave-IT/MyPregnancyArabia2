import { CommunityCategoryInterface } from '../interfaces'
import CommunityCategoryModel from '../models/CommunityCategoryModel'
import removeFile from '../utils/removeFile'
const query = CommunityCategoryModel
export default {
  get: async () => await query.find().sort({ createdAt: -1 }),

  store: async (data: CommunityCategoryInterface.ICommunityCategoryDocument) => {
    const responseData = await query.create({
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      image: data.image,
    })
    return responseData
  },

  getById: async (id: string) => await query.findById(id),

  update: async (data: CommunityCategoryInterface.ICommunityCategoryDocument, id: string) => {
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
