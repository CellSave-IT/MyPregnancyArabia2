import { BabySizeInterface } from '../interfaces'
import BabySizeModel from '../models/BabySizeModel'
import removeFile from '../utils/removeFile'
const query = BabySizeModel
export default {
  get: async () => query.find().sort({ week: 1 }),
  store: async (data: BabySizeInterface.IBabySizeDocument) => {
    const responseData = await query.create({
      image: data.image,
      week: data.week,
      description: data.description,
    })
    return responseData
  },
  update: async (data: BabySizeInterface.IBabySizeDocument, id: string) => {
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
