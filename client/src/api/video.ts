import { apiClient } from "./apiClient";
import { useAuthStore } from "@/store/auth.store";

export interface UploadIntentResponse {
  videoId: string;
  uploadUrl: string;
  objectKey: string;
}

interface UploadIntentRequest {
  title: string;
  description: string;
  originalFileName: string;
  mimeType: string;
  fileSize: number;
  userId: string;
}

export async function uploadVideoIntent(
  file: File,
  title: string,
  description: string
): Promise<UploadIntentResponse> {
  const userId = useAuthStore.getState().user?.id;
  if (!userId) {
    throw new Error("User must be authenticated to upload video");
  }

  const payload: UploadIntentRequest = {
    title,
    description,
    originalFileName: file.name,
    mimeType: file.type,
    fileSize: file.size,
    userId,
  };

  const { data } = await apiClient.post<UploadIntentResponse>(
    "/video/upload-intent",
    payload
  );

  console.log("Received upload intent response:", data); // Debugging log

  return data;
}