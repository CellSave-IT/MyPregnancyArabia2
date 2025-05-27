import { Router } from 'express'
import { RegistrationController } from '../controllers'
import authMiddleware from '../middlewares/AuthMiddleware'
const routes = Router()
routes.get('/', authMiddleware, RegistrationController.get)
routes.post('/payment', RegistrationController.payment)
routes.post('/payment/check', RegistrationController.check)
routes.post('/store', RegistrationController.store)

export default routes
