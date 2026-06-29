"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { grammarLessons, GRAMMAR_CATEGORY_META } from "@/data/grammar"
import type { GrammarCategory } from "@/data/grammar"
import { readCompletedLessons } from "@/lib/hooks/useCompletedItems"
import { useTrack } from "@/lib/track-context"
import { LevelBadge } from "@/components/shared/LevelBadge"
import { cn } from "@/lib/utils"
import { BookOpen, CheckCircle2, Clock, Zap, Globe, Monitor } from "lucide-react"

const ALL_CATEGORIES = Object.keys(GRAMMAR_CATEGORY_META) as GrammarCategory[]

export default function GrammarPage() {
  const { track } = useTrack()
  const [activeCategory, setActiveCategory] = useState<GrammarCategory | "all">("all")
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setCompletedIds(readCompletedLessons())
  }, [])

  const filtered = activeCategory === "all"
    ? grammarLessons
    : grammarLessons.filter((l) => l.category === activeCategory)

  const totalXP = grammarLessons.reduce((s, l) => s + l.xpReward, 0)
  const earnedXP = grammarLessons
    .filter((l) => completedIds.has(l.id))
    .reduce((s, l) => s + l.xpReward, 0)

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-5 pb-10 md:max-w-5xl overflow-x-hidden">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Grammar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {grammarLessons.length} lessons · {completedIds.size}/{grammarLessons.length} completed · {earnedXP}/{totalXP} XP
        </p>
      </div>

      <div className={cn(
        "rounded-2xl border p-4",
        track === "it" ? "border-brand-500/20 bg-brand-500/5" : "border-sky-500/20 bg-sky-500/5"
      )}>
        <div className="flex items-start gap-3">
          <div className={cn(
            "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
            track === "it" ? "bg-brand-500/15" : "bg-sky-500/15"
          )}>
            {track === "it"
              ? <Monitor className="h-4 w-4 text-brand-400" />
              : <Globe className="h-4 w-4 text-sky-400" />
            }
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground mb-0.5">
              {track === "it" ? "Grammar for IT professionals" : "Everyday English grammar"}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {track === "it"
                ? "Each lesson focuses on a grammar structure used daily in IT support, incident reports, and technical communication — with real sysadmin examples."
                : "Each lesson covers a key grammar structure with everyday examples — travel, social situations, work, and more. Switch to IT English mode to see IT-specific examples."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
            activeCategory === "all"
              ? "bg-brand-500 border-brand-500 text-white"
              : "border-border/60 text-muted-foreground hover:text-foreground bg-card/40"
          )}
        >
          All ({grammarLessons.length})
        </button>
        {ALL_CATEGORIES.map((cat) => {
          const meta = GRAMMAR_CATEGORY_META[cat]
          const count = grammarLessons.filter((l) => l.category === cat).length
          if (!count) return null
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                activeCategory === cat
                  ? `${meta.bg} ${meta.border} ${meta.color}`
                  : "border-border/60 text-muted-foreground hover:text-foreground bg-card/40"
              )}
            >
              {meta.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Lesson cards */}
      <div className="space-y-3">
        {filtered.map((lesson) => {
          const meta = GRAMMAR_CATEGORY_META[lesson.category]
          const done = completedIds.has(lesson.id)
          return (
            <Link
              key={lesson.id}
              href={`/grammar/${lesson.id}`}
              className={cn(
                "block rounded-2xl border bg-card/60 p-4 transition-colors hover:bg-card/80",
                done ? "border-emerald-500/30" : "border-border/60"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-xl", meta.bg)}>
                  {lesson.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border", meta.bg, meta.color, meta.border)}>
                      {meta.label}
                    </span>
                    <LevelBadge level={lesson.level} size="xs" />
                    {done && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" /> Done
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-foreground leading-tight">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{lesson.subtitle}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
                      <Clock className="h-3 w-3" />{lesson.estimatedMinutes} min
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-brand-400">
                      <Zap className="h-3 w-3" />+{lesson.xpReward} XP
                    </span>
                    <span className="text-[10px] text-muted-foreground/70">
                      {lesson.rules.length} rules · {track === "it" ? `${lesson.itExamples.length} IT examples` : `${lesson.generalExamples.length} examples`}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
