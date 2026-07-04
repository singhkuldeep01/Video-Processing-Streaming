import { Circle, Loader, CheckCircle2 } from "lucide-react"
import type { Step, StepStatus } from "@/types/upload"

interface UploadStepperProps {
  steps: Step[]
  currentStep: string
}

export const UploadStepper = ({ steps, currentStep }: UploadStepperProps) => {
  const getStepStatus = (stepId: string): StepStatus => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep)
    const stepIndex = steps.findIndex((s) => s.id === stepId)
    const isLastStep = stepIndex === steps.length - 1

    if (stepIndex < currentIndex) return "completed"
    if (stepIndex === currentIndex) {
      // If we're on the last step (COMPLETED), mark it as completed, not active
      if (isLastStep) return "completed"
      return "active"
    }
    return "pending"
  }

  const getStepIcon = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-primary" />
      case "active":
        return <Loader className="h-5 w-5 animate-spin text-primary" />
      case "pending":
        return <Circle className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-foreground">Upload Progress</h3>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id)
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`rounded-full p-1 ${
                    status === "completed" || status === "active"
                      ? "bg-primary/10"
                      : ""
                  }`}
                >
                  {getStepIcon(status)}
                </div>

                {!isLast && (
                  <div
                    className={`mt-2 w-0.5 flex-1 ${
                      status === "completed" ? "bg-primary" : "bg-border"
                    }`}
                    style={{ minHeight: "40px" }}
                  />
                )}
              </div>

              <div className="flex flex-col justify-center pb-4">
                <p
                  className={`text-sm font-medium ${
                    status === "active"
                      ? "text-primary"
                      : status === "completed"
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {status}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
