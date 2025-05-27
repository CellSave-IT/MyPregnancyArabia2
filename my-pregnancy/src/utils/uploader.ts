import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const basePath = req.baseUrl
    const target = basePath.split('/').pop()
    const uploadPath = `./uploads/${target}`
    return cb(null, uploadPath)
  },
  filename: (req, file: any, cb) => {
    const fileName = Date.now() + path.extname(file.originalname)
    const basePath = req.baseUrl
    const target = basePath.split('/').pop()
    const uploadPath = `/uploads/${target}`
    if (file?.fieldname === 'images[]') {
      req.body.images = req.body.images || []
      req.body.images.push(`${uploadPath}/${fileName}`)
    } else if (file?.fieldname === 'image') {
      req.body.image = `${uploadPath}/${fileName}`
    } else if (file.fieldname === 'banner') {
      req.body.banner = `${uploadPath}/${fileName}`
    }
    cb(null, fileName)
  },
})
const checkImageType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp|avif|svg|mp4|pdf/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  }
  cb('Invalid image format')
}
const checkVideoType = (file, cb) => {
  const filetypes = /mp4/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  }
  cb('Invalid video format')
}
const imageUploader = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    checkImageType(file, cb)
  },
})

const videoUploader = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    checkVideoType(file, cb)
  },
})

export { imageUploader, videoUploader }
