import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakCardProps {
  days: number
  isActiveToday: boolean
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"]

export function StreakCard({ days, isActiveToday }: StreakCardProps) {
  const today = new Date().getDay()
  // Sunday=0 → index 6, Monday=1 → index 0
  const todayIdx = today === 0 ? 6 : today - 1

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="flex items-center gap-1.5 mb-3">
        <Flame className="h-5 w-5 text-orange-400" />
        <span className="text-2xl font-bold text-foreground">{days}</span>
        <span className="text-sm font-medium text-muted-foreground">day streak</span>
      </div>
      <div className="flex gap-1.5">
        {DAYS.map((d, i) => {
          const filled = i <= todayIdx ? (i === todayIdx ? isActiveToday : true) : false
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center",
                  filled
                    ? "bg-orange-500 shadow-md shadow-orange-500/30"
                    : "bg-white/5 border border-border/40"
                )}
              >
                {filled && <Flame className="h-3 w-3 text-white" />}
              </div>
              <span className="text-[9px] text-muted-foreground/60">{d}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
