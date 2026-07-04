import { Upload } from "lucide-react"

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export const UploadDropzone = ({
  onFileSelect,
  disabled = false,
}: UploadDropzoneProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("video/")) {
        onFileSelect(file)
      }
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative rounded-lg border-2 border-dashed p-8 transition-all ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer border-border hover:border-primary hover:bg-primary/5"
      }`}
    >
      <input
        type="file"
        accept="video/*"
        onChange={handleFileInputChange}
        disabled={disabled}
        aria-label="Upload video file"
        title="Upload video file"
        className="absolute inset-0 cursor-pointer opacity-0"
      />

      <div className="flex flex-col items-center justify-center gap-3">
        <div className="rounded-full bg-primary/10 p-3">
          <Upload className="h-6 w-6 text-primary" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">
            Drag and drop your video here
          </p>
          <p className="text-xs text-muted-foreground">or click to browse</p>
        </div>

        <p className="text-xs text-muted-foreground">Supported: MP4, WebM, Ogg</p>
      </div>
    </div>
  )
}
