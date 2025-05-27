import { Router } from 'express'
import { DownloadController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
const routes = Router()
routes.get('/', authMiddleware, DownloadController.get)
routes.post('/store', DownloadController.store)
export default routes
