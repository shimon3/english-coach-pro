"use client"

import { useState, useEffect } from "react"
import { readStreak } from "@/lib/hooks/useStreak"
import { readXP } from "@/lib/hooks/useXPSync"
import { currentUser } from "@/data/user"
import { LevelProgressBar } from "@/components/profile/LevelProgressBar"
import { LearningStatsCard } from "@/components/profile/LearningStatsCard"

export function LiveStats() {
  const [streakDays, setStreakDays] = useState(currentUser.streakDays)
  const [totalXP, setTotalXP] = useState(currentUser.totalXP)

  useEffect(() => {
    const { streakDays: s } = readStreak()
    const { totalXP: xp } = readXP()
    setStreakDays(s)
    setTotalXP(xp)
  }, [])

  return (
    <>
      <LevelProgressBar
        currentXP={totalXP}
        xpToNextLevel={currentUser.xpToNextLevel}
        level={currentUser.currentLevel}
        sublevel={currentUser.sublevel}
      />
      <LearningStatsCard
        streakDays={streakDays}
        wordsLearned={currentUser.totalWordsLearned}
        studyMinutes={currentUser.totalStudyMinutes}
      />
    </>
  )
}
