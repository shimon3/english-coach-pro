"use client"

import { useEffect, useState } from "react"
import type { SkillArea } from "@/lib/utils"

interface SkillRadarProps {
  scores: Record<SkillArea, number>
}

const SKILLS: Array<{ key: SkillArea; label: string }> = [
  { key: "speaking", label: "Speaking" },
  { key: "listening", label: "Listening" },
  { key: "reading", label: "Reading" },
  { key: "writing", label: "Writing" },
  { key: "vocabulary", label: "Vocab" },
  { key: "grammar", label: "Grammar" },
]

const SIZE = 200
const CX = SIZE / 2
const CY = SIZE / 2
const MAX_R = 72

function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

function buildPolygon(scores: Record<SkillArea, number>, scale: number) {
  return SKILLS.map((s, i) => {
    const angle = i * 60
    const r = (scores[s.key] / 100) * MAX_R * scale
    const { x, y } = polarToXY(angle, r)
    return `${x},${y}`
  }).join(" ")
}

export function SkillRadar({ scores }: SkillRadarProps) {
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setScale(1), 300)
    return () => clearTimeout(t)
  }, [])

  const gridLevels = [0.25, 0.5, 0.75, 1]

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <p className="text-sm font-semibold text-foreground mb-3">Skill Overview</p>
      <svg width={SIZE} height={SIZE} className="mx-auto">
        {/* Grid rings */}
        {gridLevels.map((lvl) => (
          <polygon
            key={lvl}
            points={SKILLS.map((_, i) => {
              const { x, y } = polarToXY(i * 60, MAX_R * lvl)
              return `${x},${y}`
            }).join(" ")}
            fill="none"
            stroke="white"
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {SKILLS.map((_, i) => {
          const { x, y } = polarToXY(i * 60, MAX_R)
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="white"
              strokeOpacity={0.06}
              strokeWidth={1}
            />
          )
        })}

        {/* Data polygon */}
        <polygon
          points={buildPolygon(scores, scale)}
          fill="oklch(0.637 0.237 278)"
          fillOpacity={0.15}
          stroke="oklch(0.637 0.237 278)"
          strokeWidth={1.5}
          strokeOpacity={0.8}
          style={{ transition: "points 800ms ease-out" }}
        />

        {/* Score dots */}
        {SKILLS.map((s, i) => {
          const { x, y } = polarToXY(i * 60, (scores[s.key] / 100) * MAX_R * scale)
          return (
            <circle
              key={s.key}
              cx={x}
              cy={y}
              r={3}
              fill="oklch(0.637 0.237 278)"
              style={{ transition: "cx 800ms ease-out, cy 800ms ease-out" }}
            />
          )
        })}

        {/* Labels */}
        {SKILLS.map((s, i) => {
          const { x, y } = polarToXY(i * 60, MAX_R + 16)
          return (
            <text
              key={s.key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground"
              fontSize={9}
              fontWeight={500}
            >
              {s.label}
            </text>
          )
        })}
      </svg>

      {/* Score grid */}
      <div className="mt-2 grid grid-cols-3 gap-x-2 gap-y-1">
        {SKILLS.map((s) => (
          <div key={s.key} className="flex items-center justify-between">
            <span className="text-[10px] capitalize text-muted-foreground">{s.label}</span>
            <span className="text-[10px] font-semibold text-foreground">{scores[s.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
