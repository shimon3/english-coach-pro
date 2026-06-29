"use client"

import { useState, useEffect } from "react"
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner"
import { StreakCard } from "@/components/dashboard/StreakCard"
import { XPRingWrapper } from "@/components/dashboard/XPRingWrapper"
import { currentUser } from "@/data/user"
import { markActiveToday, readStreak } from "@/lib/hooks/useStreak"

export function DashboardProgress() {
  const [streakDays, setStreakDays] = useState(currentUser.streakDays)
  const [isActiveToday, setIsActiveToday] = useState(false)

  useEffect(() => {
    // Mark today active and read the updated streak
    const streak = markActiveToday()
    setStreakDays(streak.streakDays)
    const today = new Date().toISOString().split("T")[0]
    setIsActiveToday(streak.lastActiveDate === today)
  }, [])

  return (
    <>
      <WelcomeBanner
        name={currentUser.name}
        streakDays={streakDays}
        level={currentUser.currentLevel}
        sublevel={currentUser.sublevel}
      />
      <div className="grid grid-cols-2 gap-3">
        <XPRingWrapper />
        <StreakCard days={streakDays} isActiveToday={isActiveToday} />
      </div>
    </>
  )
}
