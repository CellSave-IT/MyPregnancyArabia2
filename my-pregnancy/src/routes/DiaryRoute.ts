import { Router } from 'express'
import { DiaryController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'
const routes = Router()
routes.get('/', DiaryController.get)
routes.post('/store', imageUploader.single('image'), authMiddleware, DiaryController.store)
routes.patch('/update/:id', imageUploader.single('image'), authMiddleware, DiaryController.update)
routes.get('/:id', DiaryController.getById)
routes.delete('/delete/:id', authMiddleware, DiaryController.delete)
routes.patch('/update/count/:id', DiaryController.updateCount)
export default routes
