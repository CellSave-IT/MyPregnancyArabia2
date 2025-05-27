import { Router } from 'express'
import { EventController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
import { imageUploader } from '../utils/uploader'

const routes = Router()
routes.get('/', EventController.get)
routes.post(
  '/store',
  authMiddleware,
  imageUploader.fields([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  EventController.store
)
routes.patch(
  '/update/:id',
  imageUploader.fields([
    { name: 'image', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  authMiddleware,
  EventController.update
)
routes.get('/:id', EventController.getById)
routes.delete('/delete/:id', authMiddleware, EventController.delete)

export default routes
