"use client"

import { useState, useEffect } from "react"
import { DailyGoalRing } from "@/components/dashboard/DailyGoalRing"
import { readXP } from "@/lib/hooks/useXPSync"
import { readSettings } from "@/lib/hooks/useSettings"
import { currentUser } from "@/data/user"

export function XPRingWrapper() {
  const [todayXP, setTodayXP] = useState(currentUser.todayXP)
  const [dailyGoal, setDailyGoal] = useState(currentUser.dailyGoalXP)

  useEffect(() => {
    const { todayXP: stored } = readXP()
    const { dailyGoalXP } = readSettings()
    setTodayXP(stored)
    setDailyGoal(dailyGoalXP)
  }, [])

  return <DailyGoalRing current={todayXP} goal={dailyGoal} />
}
