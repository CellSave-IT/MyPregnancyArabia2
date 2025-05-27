import GeneralSettingModel from '../models/GeneralSetting'
import removeFile from '../utils/removeFile'
const query = GeneralSettingModel
export default {
  getByGroup: async (group: string) => await query.find({ group }).exec(),
  getByKey: async (key: string) => await query.findOne({ key }).exec(),

  createOrUpdate: async (data: any) => {
    if (Array.isArray(data)) {
      const responseData = data?.map(async (item) => {
        if (item?.image) {
          const find = await query.findOne({ key: item?.key }).exec()
          if (!!find && find?.image) {
            removeFile(find.image)
          }
        }
        return await query
          .findOneAndUpdate(
            { key: item.key },
            {
              $set: item,
            },
            {
              new: true,
              upsert: true,
            }
          )
          .exec()
      })
      return await Promise.all(responseData)
    }
    if (data.image) {
      const find = await query.findOne({ key: data?.key }).exec()
      if (!!find && find?.image) {
        removeFile(find.image)
      }
    }
    const responseData = await query.findOneAndUpdate(
      { key: data.key },
      {
        $set: data,
      },
      { new: true, upsert: true }
    )
    return responseData
  },
}
