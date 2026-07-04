export interface UploadIntentRequestType {
  title: string;
  description?: string;

  originalFileName: string;
  mimeType: string;
  fileSize: number;
}

export interface UploadIntentResponseType {
  videoId: string;
  uploadUrl: string;
  objectKey: string;
  expiresIn: number;
}