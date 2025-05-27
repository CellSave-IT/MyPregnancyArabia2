import EnquirlModel from '../models/EnquiryModel'
import { EnquiryInterface } from '../interfaces'
const query = EnquirlModel
export default {
  get: async (params: EnquiryInterface.IEnquiryParams) => {
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

  store: async (data: EnquiryInterface.IEnquiryDocument) => {
    const responseData = await query.create({
      fName: data.fName,
      lName: data.lName,
      email: data.email,
      message: data.message,
      countryCode: data?.countryCode || null,
      phoneNo: data?.phoneNo || null,
    })
    return responseData
  },
}
