import { Progress } from "@/components/ui/progress"

interface UploadProgressProps {
  percentage: number
}

export const UploadProgress = ({ percentage }: UploadProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Upload progress</p>
        <p className="text-xs text-muted-foreground">{percentage}%</p>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}
