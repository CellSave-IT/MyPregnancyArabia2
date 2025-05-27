import { Router } from 'express'
import { FaqController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
const routes = Router()
routes.get('/', FaqController.get)
routes.post('/store', authMiddleware, FaqController.store)
routes.patch('/update/:id', authMiddleware, FaqController.update)
routes.delete('/delete/:id', authMiddleware, FaqController.delete)

export default routes
