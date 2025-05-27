import FaqModel from '../models/FaqModel'
import { FaqInterface } from '../interfaces'
const query = FaqModel
export default {
  get: async () => await query.find().sort({ createdAt: -1 }),

  store: async (data: FaqInterface.IFaqDocument) => {
    const responseData = await query.create({
      title: data.title,
      description: data.description,
    })
    return responseData
  },

  update: async (data: FaqInterface.IFaqDocument, id: string) => {
    const responseData = await query.findByIdAndUpdate(
      id,
      {
        $set: {
          title: data.title,
          description: data.description,
        },
      },
      { new: true }
    )
    if (!responseData) {
      throw new Error('Invalid Id')
    }
    return responseData
  },

  delete: async (id: string) => {
    const responseData = await query.findByIdAndDelete(id)
    if (!responseData) {
      throw new Error('Invalid Id')
    }
    return responseData
  },
}
