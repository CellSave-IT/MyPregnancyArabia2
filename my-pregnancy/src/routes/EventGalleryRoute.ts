import { Router } from 'express'
import { EventGalleryController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'

const routes = Router()
routes.get('/:id', EventGalleryController.get)
routes.post('/store/:id', authMiddleware, imageUploader.array('images[]'), EventGalleryController.store)
routes.delete('/delete/:id', authMiddleware, EventGalleryController.delete)

export default routes
