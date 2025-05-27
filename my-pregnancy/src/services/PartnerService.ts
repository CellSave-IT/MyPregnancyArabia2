import { PartnerInterface } from '../interfaces'
import PartnerModel from '../models/PartnerModel'
import removeFile from '../utils/removeFile'
const query = PartnerModel
export default {
  get: async () => query.find().sort({ createdAt: -1 }),
  store: async (data: PartnerInterface.IPartnerDocument) => {
    const responseData = await query.create({
      image: data.image,
      link: data.link || null,
    })
    return responseData
  },
  update: async (data: PartnerInterface.IPartnerDocument, id: string) => {
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
