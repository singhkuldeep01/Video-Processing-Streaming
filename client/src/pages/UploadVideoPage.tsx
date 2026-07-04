import { Card } from "@/components/ui/card"
import { UploadForm } from "@/components/upload/UploadForm"
import { UploadStepper } from "@/components/upload/UploadStepper"
import { useUploadVideo } from "@/hooks/useUploadVideo"
import type { Step } from "@/types/upload"

const UPLOAD_STEPS: Step[] = [
  { id: "INIT", title: "Initialize Upload" },
  { id: "UPLOAD", title: "Upload To S3" },
  { id: "COMPLETED", title: "Completed" },
]

export const UploadVideoPage = () => {
  const {
    state,
    selectFile,
    removeFile,
    setTitle,
    setDescription,
    startUpload,
  } = useUploadVideo()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground">Upload Video</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your video with the world
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Form (70%) */}
          <div className="lg:col-span-2">
            <UploadForm
              selectedFile={state.selectedFile}
              title={state.title}
              description={state.description}
              uploadPercentage={state.uploadPercentage}
              isUploading={state.isUploading}
              onFileSelect={selectFile}
              onFileRemove={removeFile}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onUpload={startUpload}
            />
          </div>

          {/* Right Column - Stepper (30%) */}
          <div>
            <Card className="sticky top-8 p-6">
              <UploadStepper
                steps={UPLOAD_STEPS}
                currentStep={state.currentStep}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
