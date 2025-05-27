import { Router } from 'express'
import { AdminController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
const routes = Router()
routes.get('/', authMiddleware, AdminController.get)
routes.post('/login', AdminController.login)
routes.post('/register', authMiddleware, AdminController.register)
routes.patch('/update/:id', authMiddleware, AdminController.update)

export default routes
