"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { vocabulary } from "@/data/vocabulary"
import type { WordCategoryIT, VocabularyWord } from "@/data/vocabulary"
import type { CEFRLevel } from "@/lib/utils"
import { useFlashcardSession } from "@/lib/hooks/useFlashcardSession"
import type { SRSRating } from "@/lib/hooks/useFlashcardSession"
import { Flashcard } from "@/components/vocabulary/Flashcard"
import { FlashcardResult } from "@/components/vocabulary/FlashcardResult"
import { X, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useXPSync } from "@/lib/hooks/useXPSync"

export default function FlashcardsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-2xl border border-border/40 bg-card/60 p-8 text-center">
          <p className="text-sm text-muted-foreground">Loading cards…</p>
        </div>
      </div>
    }>
      <FlashcardsContent />
    </Suspense>
  )
}

function FlashcardsContent() {
  const params  = useSearchParams()
  const router  = useRouter()

  const category = params.get("category") as WordCategoryIT | null
  const level    = params.get("level") as CEFRLevel | null

  const [deck, setDeck] = useState<VocabularyWord[]>([])
  const [deckReady, setDeckReady] = useState(false)

  useEffect(() => {
    let words = [...vocabulary]
    if (category) words = words.filter((w) => w.category === category)
    if (level)    words = words.filter((w) => w.level === level)
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[words[i], words[j]] = [words[j], words[i]]
    }
    setDeck(words.slice(0, 20))
    setDeckReady(true)
  }, [category, level])

  const { addXP } = useXPSync()
  const { current, session, progress, ratingCounts, totalCards, currentCardNumber, flip, rate, restart } =
    useFlashcardSession(deck)

  // Re-initialize session once the deck is ready (hook initializes with empty array)
  useEffect(() => {
    if (deckReady && deck.length > 0) restart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckReady])

  // XP sync on session complete
  useEffect(() => {
    if (session.isComplete && totalCards > 0) {
      const earned = Math.round(totalCards * 5 + ratingCounts[4] * 3 + ratingCounts[3] * 2)
      addXP(earned)
    }
    // Only fire once when isComplete flips to true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isComplete])

  // Keyboard shortcuts
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "f") { e.preventDefault(); flip() }
      if (session.isFlipped) {
        if (e.key === "1") rate(1)
        if (e.key === "2") rate(2)
        if (e.key === "3") rate(3)
        if (e.key === "4") rate(4)
      }
    },
    [flip, rate, session.isFlipped]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handleKey])

  if (!deckReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-2xl border border-border/40 bg-card/60 p-8 text-center">
          <p className="text-sm text-muted-foreground">Loading cards…</p>
        </div>
      </div>
    )
  }

  if (session.isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start pt-6 px-4">
        <FlashcardResult
          totalCards={totalCards}
          ratingCounts={ratingCounts}
          onRestart={restart}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{currentCardNumber}</span>
          <span>/</span>
          <span>{totalCards}</span>
        </div>

        <button
          onClick={() => router.push("/vocabulary")}
          className="rounded-lg p-1.5 hover:bg-white/5 transition-colors"
          aria-label="Close session"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mx-4 h-1.5 rounded-full bg-white/8 overflow-hidden shrink-0">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Keyboard hint */}
      <p className="mt-2 text-center text-[10px] text-muted-foreground/40 shrink-0">
        Space to flip · 1–4 to rate
      </p>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {current && (
          <Flashcard
            word={current.word}
            isFlipped={session.isFlipped}
            onFlip={flip}
            onRate={(r: SRSRating) => rate(r)}
          />
        )}
      </div>
    </div>
  )
}
