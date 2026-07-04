import { useState, useCallback } from "react"
import type { UploadState } from "@/types/upload"
import {uploadVideoIntent} from "@/api/video"
import { uploadToS3 } from "@/services/s3.service"

export const useUploadVideo = () => {
  const [state, setState] = useState<UploadState>({
    selectedFile: null,
    title: "",
    description: "",
    currentStep: "INIT",
    uploadPercentage: 0,
    isUploading: false,
  })

  const selectFile = useCallback((file: File) => {
    setState((prev) => ({
      ...prev,
      selectedFile: file,
    }))
  }, [])

  const removeFile = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedFile: null,
    }))
  }, [])

  const setTitle = useCallback((title: string) => {
    console.log("Setting title:", title); // Debugging log
    setState((prev) => ({
      ...prev,
      title,
    }))
  }, [])

  const setDescription = useCallback((description: string) => {
    setState((prev) => ({
      ...prev,
      description,
    }))
  }, [])

  const startUpload = async()=> {
    if (!state.selectedFile) return

    console.log("Starting upload for file:", state.selectedFile.name , "Title:", state.title, "Description:", state.description);   


    await uploadVideoIntent(state.selectedFile, state.title, state.description );

    setState((prev) => ({
      ...prev,
      isUploading: true,
      currentStep: "INIT",
      uploadPercentage: 0,
    }))

         // STEP 1 - Upload Intent
      const uploadIntent = await uploadVideoIntent(
        state.selectedFile,
        state.title,
        state.description
      );

      // STEP 2 - Upload To S3
      setState((prev) => ({
        ...prev,
        currentStep: "UPLOAD",
      }));

      await uploadToS3(
        uploadIntent.uploadUrl,
        state.selectedFile,
        (progress) => {
          setState((prev) => ({
            ...prev,
            uploadPercentage: progress,
          }));
        }
      );

        // STEP 3 - Completed
        setState((prev) => ({
            ...prev,
            currentStep: "COMPLETED",
            isUploading: false,
            uploadPercentage: 100,
        }));

      console.log("Video uploaded successfully!");
  }

  return {
    state,
    selectFile,
    removeFile,
    setTitle,
    setDescription,
    startUpload,
  }
}
