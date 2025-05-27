import { Request, Response } from 'express'
import CommunityModel from '../models/CommunityModel'
import DiaryModel from '../models/DiaryModel'
import EventModel from '../models/EventModel'
import { response } from '../utils'
export default {
  get: async (req: Request, res: Response) => {
    try {
      const [totalCommunities, totalDiaries, totalUpcomingEvents, totalPastEvents] = await Promise.all([
        CommunityModel.countDocuments(),
        DiaryModel.countDocuments(),
        EventModel.countDocuments({ date: { $gte: new Date() } }),
        EventModel.countDocuments({ date: { $lte: new Date() } }),
      ])

      response.success({
        res,
        status: 200,
        data: {
          totalCommunities,
          totalDiaries,
          totalUpcomingEvents,
          totalPastEvents,
        },
      })
    } catch (err: any) {
      response.error({
        res,
        message: err.message,
        status: 500,
      })
    }
  },
}
