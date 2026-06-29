"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { GrammarNote, VocabHighlight } from "@/data/conversations"
import type { SessionScores } from "@/lib/hooks/useConversationChat"
import { X, Zap, Lightbulb, BookOpen, RotateCcw, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react"

interface FeedbackDrawerProps {
  scenarioTitle: string
  xpEarned: number
  grammarNotes: GrammarNote[]
  vocabLearned: VocabHighlight[]
  exchangeCount: number
  isComplete: boolean
  scores: SessionScores
  onClose: () => void
  onRestart: () => void
}

// SVG circular score gauge — same visual language as DailyGoalRing
function ScoreGauge({ score, label }: { score: number; label: string }) {
  const size = 72
  const strokeWidth = 6
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - score / 100)

  const color =
    score >= 80 ? "text-emerald-400" :
    score >= 60 ? "text-amber-400" :
    "text-rose-400"

  const strokeColor =
    score >= 80 ? "oklch(0.697 0.19 164)" :   // emerald
    score >= 60 ? "oklch(0.769 0.188 70)" :    // amber
    "oklch(0.637 0.237 25)"                    // rose

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="currentColor" strokeWidth={strokeWidth}
            className="text-white/5"
          />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("text-sm font-bold", color)}>{score}</span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground text-center leading-tight">{label}</p>
    </div>
  )
}

export function FeedbackDrawer({
  scenarioTitle,
  xpEarned,
  grammarNotes,
  vocabLearned,
  exchangeCount,
  isComplete,
  scores,
  onClose,
  onRestart,
}: FeedbackDrawerProps) {
  const router = useRouter()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-border/60 bg-card shadow-2xl max-h-[92vh] overflow-y-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:max-w-lg md:w-full md:rounded-2xl md:border">
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="h-1 w-10 rounded-full bg-border/60" />
        </div>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1">
                Session Summary
              </p>
              <h2 className="text-lg font-bold text-foreground leading-tight">{scenarioTitle}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* XP + exchanges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-brand-500/10 border border-brand-500/20 p-3 text-center">
              <Zap className="h-4 w-4 text-brand-400 mx-auto mb-1" />
              <p className="text-xl font-black text-brand-300">+{xpEarned}</p>
              <p className="text-[10px] text-muted-foreground">XP earned</p>
            </div>
            <div className="rounded-2xl bg-white/4 border border-border/30 p-3 text-center">
              <MessageSquare className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
              <p className="text-xl font-black text-foreground">{exchangeCount}</p>
              <p className="text-[10px] text-muted-foreground">exchanges</p>
            </div>
            <div className="rounded-2xl bg-white/4 border border-border/30 p-3 text-center">
              <CheckCircle2 className={cn("h-4 w-4 mx-auto mb-1", isComplete ? "text-emerald-400" : "text-muted-foreground")} />
              <p className={cn("text-xl font-black", isComplete ? "text-emerald-400" : "text-muted-foreground")}>
                {isComplete ? "✓" : `${scores.completionScore}%`}
              </p>
              <p className="text-[10px] text-muted-foreground">{isComplete ? "complete" : "progress"}</p>
            </div>
          </div>

          {/* Score gauges */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-3">Performance Scores</p>
            <div className="grid grid-cols-4 gap-3 rounded-2xl border border-border/40 bg-white/3 p-4">
              <ScoreGauge score={scores.grammarScore} label="Grammar" />
              <ScoreGauge score={scores.professionalScore} label="Professional" />
              <ScoreGauge score={scores.vocabularyScore} label="Vocabulary" />
              <ScoreGauge score={scores.completionScore} label="Completion" />
            </div>
          </div>

          {/* Mistakes to review */}
          {grammarNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-amber-400" />
                <p className="text-sm font-semibold text-foreground">
                  Mistakes to Review ({grammarNotes.length})
                </p>
              </div>
              <div className="space-y-2">
                {grammarNotes.map((note, i) => (
                  <div key={i} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 font-bold text-amber-400/70 mt-0.5">{i + 1}.</span>
                      <div className="space-y-1.5 flex-1">
                        <p className="text-muted-foreground/70 italic">&ldquo;{note.triggerPhrase}&rdquo;</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <ArrowRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />
                          <span className="text-emerald-400 font-medium">{note.correction}</span>
                        </div>
                        {note.betterAlternative && (
                          <div className="flex items-start gap-1.5 pt-1 border-t border-amber-500/10">
                            <span className="text-muted-foreground/50 shrink-0">Better:</span>
                            <span className="text-brand-300 font-semibold">&ldquo;{note.betterAlternative}&rdquo;</span>
                          </div>
                        )}
                        <p className="text-muted-foreground leading-relaxed">{note.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Better alternatives quick reference */}
          {grammarNotes.some((n) => n.betterAlternative) && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Better Alternatives</p>
              <div className="flex flex-wrap gap-2">
                {grammarNotes
                  .filter((n) => n.betterAlternative)
                  .map((note, i) => (
                    <span
                      key={i}
                      className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5 text-xs font-medium text-emerald-300 leading-snug"
                    >
                      &ldquo;{note.betterAlternative}&rdquo;
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Vocabulary learned */}
          {vocabLearned.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-brand-400" />
                <p className="text-sm font-semibold text-foreground">
                  Vocabulary Learned ({vocabLearned.length})
                </p>
              </div>
              <div className="space-y-2">
                {vocabLearned.map((vocab, i) => (
                  <div key={i} className="rounded-xl border border-border/40 bg-white/4 p-3 text-xs">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="font-bold text-foreground">{vocab.word}</span>
                      <span className="font-mono text-brand-300/70">{vocab.phonetic}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{vocab.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No content yet */}
          {grammarNotes.length === 0 && vocabLearned.length === 0 && (
            <div className="rounded-xl border border-border/40 bg-white/4 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Continue the conversation to receive grammar tips and vocabulary highlights.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => { onRestart(); onClose() }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/60 py-3 text-sm font-semibold text-foreground hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
            <button
              onClick={() => router.push("/conversations")}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              All Scenarios
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
