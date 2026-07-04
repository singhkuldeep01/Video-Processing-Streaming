import axiosInstance from "./axiosInstance";

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
}

export async function uploadVideoIntent(
  file: File,
  title: string,
  description: string
): Promise<UploadIntentResponse> {
  const payload: UploadIntentRequest = {
    title,
    description,
    originalFileName: file.name,
    mimeType: file.type,
    fileSize: file.size,
  };

  const { data } = await axiosInstance.post<UploadIntentResponse>(
    "/video/upload-intent",
    payload
  );

  console.log("Received upload intent response:", data); // Debugging log

  return data;
}