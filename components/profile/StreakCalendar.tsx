import { cn } from "@/lib/utils"
import type { ActivityDay } from "@/data/user"

interface StreakCalendarProps {
  activityLog: ActivityDay[]
}

const WEEK_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"]

function getIntensity(xp: number): number {
  if (xp === 0) return 0
  if (xp < 100) return 1
  if (xp < 200) return 2
  if (xp < 300) return 3
  return 4
}

const intensityClass = [
  "bg-white/4 border border-border/20",
  "bg-brand-900/80 border border-brand-800/60",
  "bg-brand-700/60 border border-brand-600/50",
  "bg-brand-600/70 border border-brand-500/60",
  "bg-brand-500 border border-brand-400/50 shadow-sm shadow-brand-500/30",
]

export function StreakCalendar({ activityLog }: StreakCalendarProps) {
  // Build a 12-week grid (84 days) — group by week
  const weeks: ActivityDay[][] = []
  for (let w = 0; w < 12; w++) {
    weeks.push(activityLog.slice(w * 7, w * 7 + 7))
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-foreground">Activity</p>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <span>Less</span>
          {intensityClass.map((c, i) => (
            <div key={i} className={cn("h-2.5 w-2.5 rounded-sm", c)} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {/* Day labels column */}
        <div className="flex flex-col justify-between pt-4 pr-1 shrink-0">
          {WEEK_LABELS.map((label, i) => (
            <span key={i} className="text-[9px] text-muted-foreground/50 h-3 leading-3">
              {label}
            </span>
          ))}
        </div>

        {/* Week columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1 shrink-0">
            {week.map((day, di) => (
              <div
                key={day.date}
                className={cn(
                  "h-3 w-3 rounded-sm transition-colors",
                  intensityClass[getIntensity(day.xp)]
                )}
                title={`${day.date}: ${day.xp} XP`}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Last 12 weeks · {activityLog.filter((d) => d.xp > 0).length} active days
      </p>
    </div>
  )
}
