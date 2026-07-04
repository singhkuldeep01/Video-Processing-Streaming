import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { UploadDropzone } from "./UploadDropzone"
import { SelectedFile } from "./SelectedFile"
import { UploadProgress } from "./UploadProgress"

interface UploadFormProps {
  selectedFile: File | null
  title: string
  description: string
  uploadPercentage: number
  isUploading: boolean
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  onTitleChange: (title: string) => void
  onDescriptionChange: (description: string) => void
  onUpload: () => void
}


export const UploadForm = ({
  selectedFile,
  title,
  description,
  uploadPercentage,
  isUploading,
  onFileSelect,
  onFileRemove,
  onTitleChange,
  onDescriptionChange,
  onUpload,
}: UploadFormProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Select Video
            </h3>
            <UploadDropzone onFileSelect={onFileSelect} disabled={isUploading} />
          </div>

          {selectedFile && (
            <SelectedFile file={selectedFile} onRemove={onFileRemove} />
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              disabled={isUploading}
              className="mt-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter video description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              disabled={isUploading}
              rows={4}
              className="mt-2 resize-none"
            />
          </div>
        </div>
      </Card>

      {isUploading && (
        <Card className="p-6">
          <UploadProgress percentage={uploadPercentage} />
        </Card>
      )}

      <Button
        onClick={onUpload}
        disabled={!selectedFile || !title.trim() || isUploading}
        size="lg"
        className="w-full"
      >
        {isUploading ? "Uploading..." : "Upload Video"}
      </Button>
    </div>
  )
}
