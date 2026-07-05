import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/config/s3.config";

interface GenerateUploadUrlParams {
  objectKey: string;
  mimeType: string;
}

export async function generateUploadUrl({
  objectKey,
  mimeType,
}: GenerateUploadUrlParams) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: objectKey,
    ContentType: mimeType,
  });

  return getSignedUrl(s3Client, command, {
    expiresIn: process.env.AWS_S3_EXPIRY_TIME ? parseInt(process.env.AWS_S3_EXPIRY_TIME) : 1800, // Default to 30 minutes if not set
  });
}