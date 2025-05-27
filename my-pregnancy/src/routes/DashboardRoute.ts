import { Router } from 'express'
import { DashboardController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'

const routes = Router()
routes.get('/', authMiddleware, DashboardController.get)

export default routes
