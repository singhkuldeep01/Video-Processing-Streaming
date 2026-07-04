import { prisma } from "@/lib/prisma";

interface CreateVideoPayload {
  title: string;
  description?: string;
  ownerId: string;
  mimeType: string;
  fileSize: bigint;
}

export async function createVideo({
  title,
  description,
  ownerId,
  mimeType,
  fileSize,
}: CreateVideoPayload) {
  return prisma.video.create({
    data: {
      title,
      description,
      ownerId,
      mimeType,
      fileSize,
      status: "PENDING",
    },
  });
}

export async function updateOriginalObjectKey(
  videoId: string,
  objectKey: string
) {
  return prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      originalObjectKey: objectKey,
    },
  });
}

export async function findVideoById(videoId: string) {
  return prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });
}

export async function updateVideoStatus(
  videoId: string,
  status: "PENDING" | "UPLOADED" | "PROCESSING" | "READY" | "FAILED"
) {
  return prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      status,
    },
  });
}