import axios from "axios";

export async function uploadToS3(
  uploadUrl: string,
  file: File,
  onProgress: (progress: number) => void
) {
  await axios.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },

    onUploadProgress(progressEvent) {
      if (!progressEvent.total) return;

      const progress = Math.round(
        (progressEvent.loaded * 100) /
          progressEvent.total
      );

      onProgress(progress);
    },
  });
}