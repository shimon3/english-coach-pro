"use client"

import { useRouter } from "next/navigation"
import type { SRSRating } from "@/lib/hooks/useFlashcardSession"
import { cn } from "@/lib/utils"
import { Trophy, RotateCcw, BookOpen, Zap, CheckCircle2, AlertCircle } from "lucide-react"

interface FlashcardResultProps {
  totalCards: number
  ratingCounts: Partial<Record<SRSRating, number>>
  onRestart: () => void
}

const RATING_META = [
  { rating: 1 as SRSRating, label: "Again",  color: "text-rose-400",    bg: "bg-rose-400/10",    icon: AlertCircle },
  { rating: 2 as SRSRating, label: "Hard",   color: "text-amber-400",   bg: "bg-amber-400/10",   icon: null },
  { rating: 3 as SRSRating, label: "Good",   color: "text-brand-300",   bg: "bg-brand-400/10",   icon: null },
  { rating: 4 as SRSRating, label: "Easy",   color: "text-emerald-400", bg: "bg-emerald-400/10", icon: CheckCircle2 },
]

function getXP(total: number, counts: Partial<Record<SRSRating, number>>): number {
  const easy  = (counts[4] ?? 0) * 10
  const good  = (counts[3] ?? 0) * 7
  const hard  = (counts[2] ?? 0) * 4
  return easy + good + hard
}

export function FlashcardResult({ totalCards, ratingCounts, onRestart }: FlashcardResultProps) {
  const router = useRouter()
  const xp = getXP(totalCards, ratingCounts)
  const mastered = (ratingCounts[3] ?? 0) + (ratingCounts[4] ?? 0)
  const pct = totalCards > 0 ? Math.round((mastered / totalCards) * 100) : 0

  const scoreColor = pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-amber-400" : "text-rose-400"
  const scoreLabel = pct >= 80 ? "Excellent!" : pct >= 60 ? "Good job!" : "Keep practicing!"

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 max-w-md mx-auto w-full">
      {/* Trophy */}
      <div className="relative">
        <div className="h-20 w-20 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
          <Trophy className="h-9 w-9 text-brand-400" />
        </div>
        <div className="absolute -top-1 -right-1 flex items-center gap-0.5 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">
          <Zap className="h-2.5 w-2.5" />
          +{xp}
        </div>
      </div>

      {/* Score */}
      <div className="text-center">
        <p className={cn("text-5xl font-black", scoreColor)}>{pct}%</p>
        <p className="text-base font-semibold text-foreground mt-1">{scoreLabel}</p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {mastered} of {totalCards} cards mastered this session
        </p>
      </div>

      {/* Breakdown */}
      <div className="w-full rounded-2xl border border-border/60 bg-card/60 p-4 space-y-2">
        {RATING_META.map(({ rating, label, color, bg }) => {
          const count = ratingCounts[rating] ?? 0
          const barPct = totalCards > 0 ? (count / totalCards) * 100 : 0
          return (
            <div key={rating} className="flex items-center gap-3">
              <span className={cn("w-14 text-xs font-semibold text-right shrink-0", color)}>{label}</span>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", bg.replace("/10", "/50"))}
                  style={{ width: `${barPct}%` }}
                />
              </div>
              <span className="w-5 text-xs text-muted-foreground text-right shrink-0">{count}</span>
            </div>
          )
        })}
      </div>

      {/* Due notice */}
      <p className="text-xs text-muted-foreground text-center">
        Cards rated <span className="text-brand-300 font-medium">Good</span> or <span className="text-emerald-400 font-medium">Easy</span> are scheduled for review in 1–7+ days.
      </p>

      {/* Actions */}
      <div className="flex gap-3 w-full">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/60 py-3 text-sm font-semibold text-foreground hover:bg-white/5 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
        <button
          onClick={() => router.push("/vocabulary")}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Browse Words
        </button>
      </div>
    </div>
  )
}
