import multer from "multer"
import path from "path"
import fs from "fs"

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads", "videos")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

// File filter - only accept video files
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]
  const allowedExtensions = [".mp4", ".webm", ".ogv", ".mov"]

  const ext = path.extname(file.originalname).toLowerCase()
  const isAllowedExt = allowedExtensions.includes(ext)
  const isAllowedMime = allowedMimes.includes(file.mimetype)

  if (isAllowedExt && isAllowedMime) {
    cb(null, true)
  } else {
    cb(new Error("Only video files are allowed (mp4, webm, ogv, mov)"))
  }
}

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // 5GB
  },
})

export default upload
