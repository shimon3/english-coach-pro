"use client"

import { useState, useEffect } from "react"
import { SkillRadar } from "@/components/dashboard/SkillRadar"
import { computeSkillScores } from "@/lib/hooks/useSkillScores"
import type { SkillArea } from "@/lib/utils"

interface SkillRadarWrapperProps {
  baselineScores: Record<SkillArea, number>
}

export function SkillRadarWrapper({ baselineScores }: SkillRadarWrapperProps) {
  const [scores, setScores] = useState(baselineScores)

  useEffect(() => {
    setScores(computeSkillScores(baselineScores))
  }, [baselineScores])

  return <SkillRadar scores={scores} />
}
