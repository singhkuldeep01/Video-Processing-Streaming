import { Router, Request, Response } from "express"
import upload from "@/middleware/upload"
import { prisma } from "@/lib/prisma"

const router = Router()

// Upload video endpoint
router.post("/upload", upload.single("video"), async (req: Request, res: Response) => {
  try {
    console.log("Upload request received")
    console.log("File:", req.file ? { name: req.file.filename, size: req.file.size } : "None")
    console.log("Body:", req.body)

    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" })
    }

    const { title, description } = req.body

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" })
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ error: "Description is required" })
    }

    // Save video metadata to database
    const video = await prisma.video.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        url: `/uploads/videos/${req.file.filename}`,
        duration: 0, // TODO: Calculate from video file
      },
    })

    res.json({
      success: true,
      message: "Video uploaded successfully",
      data: video,
    })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({ error: "Failed to upload video" })
  }
})

export default router
