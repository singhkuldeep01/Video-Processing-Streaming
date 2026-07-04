export type UploadStep = "INIT" | "UPLOAD" | "COMPLETED"

export type StepStatus = "pending" | "active" | "completed"

export interface Step {
  id: UploadStep
  title: string
}

export interface UploadFormData {
  selectedFile: File | null
  title: string
  description: string
}

export interface UploadState {
  selectedFile: File | null
  title: string
  description: string
  currentStep: UploadStep
  uploadPercentage: number
  isUploading: boolean
}
