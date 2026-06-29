"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { getLessonById, GRAMMAR_CATEGORY_META } from "@/data/grammar"
import { markLessonComplete, isLessonComplete } from "@/lib/hooks/useCompletedItems"
import { markActiveToday } from "@/lib/hooks/useStreak"
import { useXPSync } from "@/lib/hooks/useXPSync"
import { useTrack } from "@/lib/track-context"
import { LevelBadge } from "@/components/shared/LevelBadge"
import { cn } from "@/lib/utils"
import {
  ChevronLeft, CheckCircle2, Zap, Clock,
  Lightbulb, AlertTriangle, BookOpen
} from "lucide-react"

export default function GrammarLessonPage() {
  const params = useParams()
  const router = useRouter()
  const { track } = useTrack()
  const lessonId = params.lessonId as string
  const lesson = getLessonById(lessonId)

  const [done, setDone] = useState(false)
  const [xpAwarded, setXpAwarded] = useState(false)
  const { addXP } = useXPSync()

  useEffect(() => {
    if (lesson) setDone(isLessonComplete(lesson.id))
  }, [lesson])

  const handleComplete = useCallback(() => {
    if (!lesson || done) return
    markLessonComplete(lesson.id)
    markActiveToday()
    addXP(lesson.xpReward)
    setDone(true)
    setXpAwarded(true)
  }, [lesson, done, addXP])

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 text-center">
        <p className="text-base font-semibold text-foreground">Lesson not found</p>
        <button
          onClick={() => router.push("/grammar")}
          className="rounded-xl bg-brand-500/10 border border-brand-500/20 px-4 py-2 text-sm font-medium text-brand-300"
        >
          Back to Grammar
        </button>
      </div>
    )
  }

  const meta = GRAMMAR_CATEGORY_META[lesson.category]

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-6 pb-10">

      {/* Back + header */}
      <div>
        <button
          onClick={() => router.push("/grammar")}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Grammar
        </button>

        <div className="flex items-start gap-3">
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-2xl shrink-0", meta.bg)}>
            {lesson.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
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
            <h1 className="text-xl font-bold text-foreground leading-tight">{lesson.title}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{lesson.subtitle}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
                <Clock className="h-3 w-3" />{lesson.estimatedMinutes} min
              </span>
              <span className="flex items-center gap-1 text-[10px] text-brand-400">
                <Zap className="h-3 w-3" />+{lesson.xpReward} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-brand-400" />
          <p className="text-sm font-semibold text-foreground">
            {track === "it" ? "Why this matters in IT" : "Why this matters"}
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {track === "it" ? lesson.intro : lesson.generalIntro}
        </p>
      </div>

      {/* Rules */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Grammar rules</p>
        {lesson.rules.map((rule, i) => (
          <div key={i} className="rounded-2xl border border-border/60 bg-card/60 p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">{rule.title}</p>
            <div className="rounded-xl bg-brand-500/8 border border-brand-500/20 px-3 py-2">
              <p className="text-xs font-mono text-brand-300">{rule.structure}</p>
            </div>
            <div className="space-y-2">
              {rule.examples.map((ex, j) => (
                <p key={j} className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground/40 mr-2">{j + 1}.</span>
                  {ex}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Examples — IT or General based on track */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
          {track === "it" ? "IT examples" : "Everyday examples"}
        </p>
        {(track === "it" ? lesson.itExamples : lesson.generalExamples).map((ex, i) => (
          <div key={i} className="rounded-2xl border border-border/60 bg-card/60 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-1.5">{ex.label}</p>
            <p className="text-sm text-foreground leading-relaxed">
              {ex.sentence.split(ex.grammarHighlight).map((part, j, arr) => (
                <span key={j}>
                  {part}
                  {j < arr.length - 1 && (
                    <span className="text-brand-300 font-semibold underline decoration-brand-500/40 underline-offset-2">
                      {ex.grammarHighlight}
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Quick tip */}
      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4">
        <div className="flex items-start gap-2.5">
          <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-400 mb-1">Quick tip</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{lesson.quickTip}</p>
          </div>
        </div>
      </div>

      {/* Common mistake */}
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-rose-400 mb-1">Common mistake</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{lesson.commonMistake}</p>
          </div>
        </div>
      </div>

      {/* Complete button */}
      <div className="pt-2">
        {done ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <p className="text-sm font-semibold text-emerald-400">
              Lesson completed{xpAwarded ? ` · +${lesson.xpReward} XP earned!` : ""}
            </p>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="w-full rounded-2xl bg-brand-500 hover:bg-brand-600 transition-colors py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark as complete · +{lesson.xpReward} XP
          </button>
        )}
      </div>
    </div>
  )
}
