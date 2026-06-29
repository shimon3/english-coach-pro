"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface DailyGoalRingProps {
  current: number
  goal: number
}

export function DailyGoalRing({ current, goal }: DailyGoalRingProps) {
  const [animated, setAnimated] = useState(0)
  const pct = Math.min(1, current / goal)
  const size = 120
  const strokeWidth = 10
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - animated)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setTimeout(() => setAnimated(pct), 100)
    })
    return () => cancelAnimationFrame(raf)
  }, [pct])

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/5"
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#xpGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.637 0.237 278)" />
              <stop offset="100%" stopColor="oklch(0.697 0.19 164)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-foreground">{current}</span>
          <span className="text-[10px] text-muted-foreground">/ {goal} XP</span>
        </div>
      </div>
      <p className="mt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Daily Goal</p>
    </div>
  )
}
