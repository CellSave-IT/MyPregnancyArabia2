import { Router } from 'express'
import { EnquiryController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
const routes = Router()
routes.get('/', EnquiryController.get)
routes.post('/store', authMiddleware, EnquiryController.store)

export default routes
