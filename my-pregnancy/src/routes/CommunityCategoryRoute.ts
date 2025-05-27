import { Router } from 'express'
import { CommunityCategoryController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'
const routes = Router()
routes.get('/', CommunityCategoryController.get)
routes.post('/store', imageUploader.single('image'), authMiddleware, CommunityCategoryController.store)
routes.patch('/update/:id', imageUploader.single('image'), authMiddleware, CommunityCategoryController.update)
routes.get('/:id', CommunityCategoryController.getById)
routes.delete('/delete/:id', authMiddleware, CommunityCategoryController.delete)

export default routes
