import { Response } from 'express'
interface SuccessResponseProps {
  res: Response
  message?: string
  status?: number
  data?: any
}
interface ErrorResponseProps {
  res: Response
  message?: string
  status?: number
  errors?: any
}
export default {
  success: ({ res, message, status, data }: SuccessResponseProps) => {
    res.status(status || 200).json({
      success: true,
      message: message || 'success',
      data,
    })
  },
  error: ({ res, message, status, errors }: ErrorResponseProps) => {
    res.status(status || 500).json({
      success: false,
      message: message || 'error',
      errors,
    })
  },
}
