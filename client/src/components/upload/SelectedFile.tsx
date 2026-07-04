import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SelectedFileProps {
  file: File
  onRemove: () => void
}

export const SelectedFile = ({ file, onRemove }: SelectedFileProps) => {
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4">
      <div className="flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground">{fileSizeMB} MB</p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="ml-2 h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
