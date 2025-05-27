import { Router } from 'express'
import { GalleryController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'

const routes = Router()
routes.get('/', GalleryController.get)
routes.post('/store', authMiddleware, imageUploader.array('images[]'), GalleryController.store)
routes.patch('/update/:id', authMiddleware, imageUploader.array('images[]'), GalleryController.update)
routes.get('/:id', GalleryController.getById)
routes.delete('/delete/:id', authMiddleware, GalleryController.delete)
routes.delete('/deleteImage/:id', authMiddleware, GalleryController.deleteImage)

export default routes
