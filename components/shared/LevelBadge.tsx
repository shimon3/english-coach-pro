import { cn, getLevelColors } from "@/lib/utils"
import type { CEFRLevel } from "@/lib/utils"

interface LevelBadgeProps {
  level: CEFRLevel
  sublevel?: number
  size?: "xs" | "sm" | "md"
  className?: string
}

export function LevelBadge({ level, sublevel, size = "sm", className }: LevelBadgeProps) {
  const colors = getLevelColors(level)
  const sizeClass = {
    xs: "text-[10px] px-1.5 py-0.5",
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  }[size]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md font-semibold border",
        colors.text, colors.bg, colors.border,
        sizeClass,
        className
      )}
    >
      {level}
      {sublevel && <span className="opacity-60">·{sublevel}</span>}
    </span>
  )
}
