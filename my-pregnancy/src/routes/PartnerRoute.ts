import { Router } from 'express'
import { PartnerController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'
const routes = Router()
routes.get('/', PartnerController.get)
routes.post('/store', imageUploader.single('image'), authMiddleware, PartnerController.store)
routes.patch('/update/:id', imageUploader.single('image'), authMiddleware, PartnerController.update)
routes.delete('/delete/:id', authMiddleware, PartnerController.delete)
export default routes
