import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { response } from '../utils'
const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')
  console.log(token)
  if (!token) {
    return response.error({ res, status: 401, message: 'Unauthorized', errors: [] })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!decoded) {
      return response.error({ res, status: 401, message: 'Unauthorized', errors: [] })
    }
    req.user = decoded
    next()
  } catch (e: any) {
    response.error({ res, status: 400, message: 'Token is invalid', errors: [] })
  }
}

export default authMiddleware
