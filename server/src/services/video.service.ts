import {
  createVideo,
  updateOriginalObjectKey,
} from "@/repository/video.repository";
import { UploadIntentRequestType } from "@/types/uploadIntent.type";
import { generateUploadUrl } from "@/services/s3.service";
export async function uploadVideoIntentService({
  title,
  description,
  originalFileName,
  mimeType,
  fileSize,
  userId,
}: UploadIntentRequestType) {
  const ownerId = userId;
  const extension = originalFileName.split(".").pop();
  const video = await createVideo({
    title,
    description,
    ownerId,
    mimeType,
    fileSize: BigInt(fileSize),
  });

  const objectKey = `videos/${ownerId}/${video.id}/original.${extension}`;

  const uploadUrl = await generateUploadUrl({
    objectKey,
    mimeType,
  });

  console.log("Generated upload URL:", uploadUrl);

  await updateOriginalObjectKey(video.id, objectKey);

  return {
    videoId: video.id,
    uploadUrl,
    objectKey,
    expiresIn: 60 * 30, // 30 minutes
  };
}
