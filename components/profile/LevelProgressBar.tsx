"use client"

import { useEffect, useState } from "react"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { Zap } from "lucide-react"
import type { CEFRLevel } from "@/lib/utils"

const NEXT_LEVEL: Record<CEFRLevel, CEFRLevel | null> = {
  A1: "A2", A2: "B1", B1: "B2", B2: "C1", C1: "C2", C2: null,
}

interface LevelProgressBarProps {
  currentXP: number
  xpToNextLevel: number
  level: CEFRLevel
  sublevel: number
}

export function LevelProgressBar({ currentXP, xpToNextLevel, level, sublevel }: LevelProgressBarProps) {
  const next = NEXT_LEVEL[level]
  const pct = Math.round((currentXP / xpToNextLevel) * 100)

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Level {level}·{sublevel}
          </p>
          {next && (
            <p className="text-xs text-muted-foreground">
              {(xpToNextLevel - currentXP).toLocaleString()} XP to {next}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-brand-400">
          <Zap className="h-4 w-4" />
          <span className="text-lg font-bold">{currentXP.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">/ {xpToNextLevel.toLocaleString()}</span>
        </div>
      </div>
      <ProgressBar value={currentXP} max={xpToNextLevel} variant="thick" color="brand" />
      <p className="mt-1.5 text-right text-xs font-medium text-brand-400">{pct}%</p>
    </div>
  )
}
