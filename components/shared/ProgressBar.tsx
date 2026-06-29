import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  variant?: "slim" | "thick" | "pill"
  color?: "brand" | "success" | "warning" | "danger"
  className?: string
  showLabel?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  variant = "pill",
  color = "brand",
  className,
  showLabel,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const trackClass = {
    slim: "h-1",
    thick: "h-3",
    pill: "h-2",
  }[variant]

  const fillColor = {
    brand: "bg-brand-500",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  }[color]

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full rounded-full bg-white/8 overflow-hidden",
          trackClass
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", fillColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-muted-foreground text-right">
          {value} / {max}
        </p>
      )}
    </div>
  )
}
