import { Router } from 'express'
import { CommunityController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'
const routes = Router()
routes.get('/', CommunityController.get)
routes.post('/store', imageUploader.single('image'), authMiddleware, CommunityController.store)
routes.patch('/update/:id', imageUploader.single('image'), authMiddleware, CommunityController.update)
routes.get('/:id', CommunityController.getById)
routes.delete('/delete/:id', authMiddleware, CommunityController.delete)

export default routes
