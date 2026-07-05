import { uploadVideoIntentService } from "@/services/video.service";
import { Request, Response } from "express";

export async function uploadIntentVideoController(req: Request, res: Response) {
  const { title, description, originalFileName, mimeType, fileSize } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User not authenticated" });
  }

  const result = await uploadVideoIntentService({ title, description, originalFileName, mimeType, fileSize, userId });
  res.json({
    videoId: result.videoId,
    uploadUrl: result.uploadUrl,
    objectKey: result.objectKey,
    expiresIn: 60 * 30, // 30 minutes
  });
}