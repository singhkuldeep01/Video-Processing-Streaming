import { uploadVideoIntentService } from "@/services/videoService";
import { Request, Response } from "express";

export async function uploadIntentVideoController(req: Request, res: Response) {
  const { title, description, originalFileName, mimeType, fileSize } = req.body;

  const result = await uploadVideoIntentService({ title, description, originalFileName, mimeType, fileSize });
  res.json({
    videoId: result.videoId,
    uploadUrl: result.uploadUrl,
    objectKey: result.objectKey,
    expiresIn: 60 * 30, // 30 minutes
  });
}