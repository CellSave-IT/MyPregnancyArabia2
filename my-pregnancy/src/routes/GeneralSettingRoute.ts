import { Router } from 'express'
import { GeneralSettingController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'

const routes = Router()
routes.get('/key/:key', GeneralSettingController.getByKey)
routes.get('/group/:group', GeneralSettingController.getByGroup)
routes.post('/store', authMiddleware, imageUploader.single('image'), GeneralSettingController.createOrUpdate)
export default routes
