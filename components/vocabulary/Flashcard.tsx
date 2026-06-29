"use client"

import { cn } from "@/lib/utils"
import type { VocabularyWord } from "@/data/vocabulary"
import type { SRSRating } from "@/lib/hooks/useFlashcardSession"
import { CATEGORY_META } from "@/data/vocabulary"
import { RotateCcw } from "lucide-react"
import { SpeakButton } from "@/components/shared/SpeakButton"

interface FlashcardProps {
  word: VocabularyWord
  isFlipped: boolean
  onFlip: () => void
  onRate: (rating: SRSRating) => void
}

const RATING_BUTTONS: { rating: SRSRating; label: string; shortcut: string; color: string }[] = [
  { rating: 1, label: "Again",  shortcut: "1", color: "border-rose-500/50   text-rose-400   hover:bg-rose-500/10   active:bg-rose-500/20" },
  { rating: 2, label: "Hard",   shortcut: "2", color: "border-amber-500/50  text-amber-400  hover:bg-amber-500/10  active:bg-amber-500/20" },
  { rating: 3, label: "Good",   shortcut: "3", color: "border-brand-500/50  text-brand-300  hover:bg-brand-500/10  active:bg-brand-500/20" },
  { rating: 4, label: "Easy",   shortcut: "4", color: "border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 active:bg-emerald-500/20" },
]

const POS_COLOR: Record<string, string> = {
  noun:         "bg-blue-400/10    text-blue-300    border border-blue-400/20",
  verb:         "bg-violet-400/10  text-violet-300  border border-violet-400/20",
  adjective:    "bg-amber-400/10   text-amber-300   border border-amber-400/20",
  adverb:       "bg-teal-400/10    text-teal-300    border border-teal-400/20",
  phrase:       "bg-cyan-400/10    text-cyan-300    border border-cyan-400/20",
  "phrasal-verb":"bg-purple-400/10 text-purple-300  border border-purple-400/20",
  idiom:        "bg-orange-400/10  text-orange-300  border border-orange-400/20",
  abbreviation: "bg-rose-400/10    text-rose-300    border border-rose-400/20",
}

export function Flashcard({ word, isFlipped, onFlip, onRate }: FlashcardProps) {
  const catMeta = CATEGORY_META[word.category]

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* 3D Card */}
      <div
        className="w-full max-w-md cursor-pointer select-none"
        style={{ perspective: "1200px" }}
        onClick={onFlip}
      >
        <div
          className="relative w-full transition-transform duration-[400ms]"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "320px",
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Category pill */}
            <div className="flex items-center justify-between">
              <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md", catMeta.bg, catMeta.color)}>
                {catMeta.label}
              </span>
              <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md", POS_COLOR[word.partOfSpeech] ?? "bg-muted text-muted-foreground")}>
                {word.partOfSpeech}
              </span>
            </div>

            {/* Word */}
            <div className="flex flex-col items-center gap-3 flex-1 justify-center">
              <p className="text-4xl font-bold text-foreground text-center leading-tight">
                {word.word}
              </p>
              <p className="font-mono text-lg text-brand-300/80 tracking-wide">
                {word.phonetic}
              </p>
              <SpeakButton text={word.word} className="mt-1" />
            </div>

            <p className="text-center text-xs text-muted-foreground/60">Tap to reveal definition</p>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-brand-500/20 bg-card/90 backdrop-blur-sm p-6 shadow-xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="flex items-center justify-between">
              <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md", catMeta.bg, catMeta.color)}>
                {catMeta.label}
              </span>
              <button
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.stopPropagation(); onFlip() }}
              >
                <RotateCcw className="h-3 w-3" />
                Flip
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4">
              {/* Definition */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">Definition</p>
                <p className="text-sm font-medium text-foreground leading-relaxed">{word.definition}</p>
              </div>

              {/* Example */}
              <div className="rounded-lg bg-white/4 border border-border/30 px-3 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Example</p>
                  <SpeakButton text={word.exampleSentence} label="Hear example" className="py-0.5 px-2 text-[10px]" />
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">&ldquo;{word.exampleSentence}&rdquo;</p>
              </div>

              {/* Synonyms */}
              {word.synonyms.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5">Also</p>
                  <div className="flex flex-wrap gap-1.5">
                    {word.synonyms.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-md bg-white/5 border border-border/30 px-2 py-0.5 text-xs text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-[10px] text-muted-foreground/40">How well did you know this?</p>
          </div>
        </div>
      </div>

      {/* Rating row — only visible after flip */}
      <div
        className={cn(
          "grid grid-cols-4 gap-2 w-full max-w-md transition-all duration-300",
          isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {RATING_BUTTONS.map(({ rating, label, shortcut, color }) => (
          <button
            key={rating}
            onClick={() => onRate(rating)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl border py-3 text-sm font-semibold transition-colors",
              color
            )}
          >
            <span>{label}</span>
            <span className="text-[10px] font-normal opacity-50">[{shortcut}]</span>
          </button>
        ))}
      </div>
    </div>
  )
}
