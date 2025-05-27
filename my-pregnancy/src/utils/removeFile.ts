import fs from 'fs'
import path from 'path'
const removeFile = (oldPath: string) => {
  const fullPath = `.${path.resolve(oldPath)}`
  if (fs.existsSync(fullPath)) {
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error('Failed to delete old image:', err)
      }
    })
  }
}

export default removeFile
