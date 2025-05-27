import { Router } from 'express'
import AdminRoute from './AdminRoute'
import TestimonialRoute from './TestimonialRoute'
import FaqRoute from './FaqRoute'
import DiaryRoute from './DiaryRoute'
import CommunityCategoryRoute from './CommunityCategoryRoute'
import CommunityRoute from './CommunityRoute'
import PartnerRoutes from './PartnerRoute'
import EnquiryRoute from './EnquiryRoute'
import SubscribeRoute from './SubscribeRoute'
import BabySizeRoute from './BabySizeRoute'
import EventRoute from './EventRoute'
import EventGalleryRoute from './EventGalleryRoute'
import GeneralSettingRoute from './GeneralSettingRoute'
import RegistrationRoute from './RegistrationRoute'
import DashboardRoute from './DashboardRoute'
import DownloadRoute from './DownloadRoute'
import GalleryRoute from './GalleryRoute'
import sendMail from '../utils/sendMail'
const routes = Router()
routes.use('/admin', AdminRoute)
routes.use('/testimonials', TestimonialRoute)
routes.use('/faqs', FaqRoute)
routes.use('/diaries', DiaryRoute)
routes.use('/communityCategories', CommunityCategoryRoute)
routes.use('/communities', CommunityRoute)
routes.use('/partners', PartnerRoutes)
routes.use('/enquiry', EnquiryRoute)
routes.use('/subscribes', SubscribeRoute)
routes.use('/babySizes', BabySizeRoute)
routes.use('/events', EventRoute)
routes.use('/events/galleries', EventGalleryRoute)
routes.use('/generalSettings', GeneralSettingRoute)
routes.use('/registrations', RegistrationRoute)
routes.use('/dashboard', DashboardRoute)
routes.use('/downloads', DownloadRoute)
routes.use('/galleries', GalleryRoute)
routes.get('/test-mail', async (req: any, res: any) => {
  try {
    await sendMail({
      to: 'maqcadet3@gmail.com',
      subject: 'Event Registration',
      message: 'Thank you for your registration! Our team will get in touch with you shortly once your seat is confirmed.',
    })
    await sendMail(
      {
        to: 'maqcadet3@gmail.com',
        subject: 'Registration',
        message: 'Test has registered ',
      },
      {
        name: 'Test Name',
        address: 'mailer9861@gmail.com',
      }
    )
    res.status(status || 500).json({
      success: true,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    })
  }
})
const emailAddresses = ['rsvp@mypregnancyarabia.com', 'marketing@cellsave.com']
routes.get('/baby-size', async (req: any, res: any) => {
  try {
    await sendMail(
      {
        to: emailAddresses,
        subject: 'BABY SIZE FILE',
        message: 'The baby size file is downloaded please check website for details ',
      },
      {
        name: 'MPA',
        address: 'mailer9861@gmail.com',
      }
    )
    res.status(status || 500).json({
      success: true,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    })
  }
})
export default routes
