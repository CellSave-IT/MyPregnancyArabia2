import mongoose from 'mongoose'
async function dbConnection() {
  const DB_URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD_URI : process.env.MONGO_DEV_URI
  const DB_NAME = process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD_DB_NAME : process.env.MONGO_DEV_DB_NAME
  await mongoose.connect(DB_URL, {
    dbName: DB_NAME,
    serverSelectionTimeoutMS: 30000,
  })
}

export default dbConnection
