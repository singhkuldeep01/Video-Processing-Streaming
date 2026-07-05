export interface UploadIntentRequestType {
  title: string;
  description?: string;

  originalFileName: string;
  mimeType: string;
  fileSize: number;
  userId: string;
}

export interface UploadIntentResponseType {
  videoId: string;
  uploadUrl: string;
  objectKey: string;
  expiresIn: number;
}