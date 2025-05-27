import { Router } from 'express'
import { SubscribeController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
const routes = Router()
routes.get('/', authMiddleware, SubscribeController.get)
routes.post('/store', authMiddleware, SubscribeController.store)

export default routes
