import { Router } from 'express'
import { TestimonialController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'

const routes = Router()
routes.get('/', TestimonialController.get)
routes.post('/store', authMiddleware, imageUploader.single('image'), TestimonialController.store)
routes.patch('/update/:id', imageUploader.single('image'), authMiddleware, TestimonialController.update)
routes.delete('/delete/:id', authMiddleware, TestimonialController.delete)

export default routes
