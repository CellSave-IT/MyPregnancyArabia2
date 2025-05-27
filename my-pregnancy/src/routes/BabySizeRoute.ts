import { Router } from 'express'
import { BabySizeController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'
const routes = Router()
routes.get('/', BabySizeController.get)
routes.post('/store', imageUploader.single('image'), authMiddleware, BabySizeController.store)
routes.patch('/update/:id', imageUploader.single('image'), authMiddleware, BabySizeController.update)
routes.delete('/delete/:id', authMiddleware, BabySizeController.delete)
export default routes
