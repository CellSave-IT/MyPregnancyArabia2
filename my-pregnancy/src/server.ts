import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnection from './db'
import { allowOrigins } from './utils'
import routes from './routes'
import { Request, Response } from 'express'
async function init() {
  const app = express()
  dotenv.config()
  await dbConnection()
    .then(() => {
      console.log('Connect to database')
    })
    .catch((err) => {
      console.log('Error database connect', err)
    })
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
    })
  )
  app.use('/uploads', express.static('./uploads'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.get('/', (req: Request, res: Response) => {
    res.send('API is Working Perfectly Fine!')
  })
  app.use('/api/v1', routes)
  app.listen({ port: process.env.PORT }, () => {
    console.log(`Server ready at http://localhost:${process.env.PORT}`)
  })
}

export default init
