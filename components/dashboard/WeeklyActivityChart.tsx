"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { DayActivity } from "@/data/user"

interface WeeklyActivityChartProps {
  data: DayActivity[]
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  const [animated, setAnimated] = useState(false)
  const maxXP = Math.max(...data.map((d) => d.xp), 1)
  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <p className="text-sm font-semibold text-foreground mb-4">This Week</p>
      <div className="flex items-end justify-between gap-1.5 h-24">
        {data.map((day, i) => {
          const heightPct = maxXP > 0 ? (day.xp / maxXP) * 100 : 0
          const isToday = day.date === today
          const isZero = day.xp === 0
          return (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex flex-1 w-full items-end">
                <div
                  className={cn(
                    "w-full rounded-t-md transition-all duration-700 ease-out",
                    isZero
                      ? "bg-white/5 border border-border/30"
                      : isToday
                      ? "bg-gradient-to-t from-brand-500 to-brand-300 shadow-sm shadow-brand-500/30"
                      : "bg-brand-500/50"
                  )}
                  style={{
                    height: isZero ? "4px" : animated ? `${Math.max(8, heightPct)}%` : "4px",
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
              </div>
              <span
                className={cn(
                  "text-[9px] font-medium",
                  isToday ? "text-brand-300" : "text-muted-foreground/50"
                )}
              >
                {DAY_LABELS[i]}
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-3">
        <span className="text-xs text-muted-foreground">
          Total: <span className="font-semibold text-foreground">{data.reduce((s, d) => s + d.xp, 0)} XP</span>
        </span>
        <span className="text-xs text-muted-foreground">
          {data.filter((d) => d.xp > 0).length}/7 active days
        </span>
      </div>
    </div>
  )
}
