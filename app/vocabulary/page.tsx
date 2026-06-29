"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import { vocabulary, CATEGORY_META } from "@/data/vocabulary"
import type { VocabularyWord } from "@/data/vocabulary"
import { vocabularyGeneral, CATEGORY_META_GENERAL } from "@/data/vocabulary-general"
import type { VocabularyWordGeneral } from "@/data/vocabulary-general"
import { useTrack } from "@/lib/track-context"
import type { CEFRLevel } from "@/lib/utils"
import { getDueCount } from "@/lib/hooks/useFlashcardSession"
import { cn } from "@/lib/utils"
import { Search, X, BookOpen, Layers, ChevronRight, Star } from "lucide-react"
import { LevelBadge } from "@/components/shared/LevelBadge"
import { SpeakButton } from "@/components/shared/SpeakButton"

type AnyWord = VocabularyWord | VocabularyWordGeneral
type AnyCategoryMeta = Record<string, { label: string; color: string; bg: string; border: string }>

// ─── Types ───────────────────────────────────────────────────────────────────
const ALL_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"]
const LEVEL_COLORS: Record<CEFRLevel, string> = {
  A1: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  A2: "bg-teal-400/15    text-teal-300    border-teal-400/30",
  B1: "bg-blue-400/15   text-blue-300    border-blue-400/30",
  B2: "bg-violet-400/15  text-violet-300  border-violet-400/30",
  C1: "bg-amber-400/15   text-amber-300   border-amber-400/30",
  C2: "bg-rose-400/15    text-rose-300    border-rose-400/30",
}

// ─── Word Detail Sheet ────────────────────────────────────────────────────────
function WordSheet({ word, categoryMeta, onClose }: { word: AnyWord; categoryMeta: AnyCategoryMeta; onClose: () => void }) {
  const catMeta = categoryMeta[word.category]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-border/60 bg-card shadow-2xl max-h-[85vh] overflow-y-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:max-w-lg md:w-full md:rounded-2xl md:border">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="h-1 w-10 rounded-full bg-border/60" />
        </div>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md", catMeta.bg, catMeta.color)}>
                  {catMeta.label}
                </span>
                <LevelBadge level={word.level} size="sm" />
              </div>
              <h2 className="text-3xl font-bold text-foreground leading-tight">{word.word}</h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-mono text-base text-brand-300/80">{word.phonetic}</p>
                <SpeakButton text={word.word} />
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-white/5 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Part of speech */}
          <div className="inline-block rounded-md bg-white/5 border border-border/30 px-2 py-0.5 text-xs font-medium text-muted-foreground capitalize">
            {word.partOfSpeech}
          </div>

          {/* Definition */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5">Definition</p>
            <p className="text-sm text-foreground leading-relaxed">{word.definition}</p>
          </div>

          {/* Example */}
          <div className="rounded-xl bg-brand-500/5 border border-brand-500/15 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-400/60 mb-1.5">Example sentence</p>
            <p className="text-sm text-muted-foreground italic leading-relaxed">&ldquo;{word.exampleSentence}&rdquo;</p>
          </div>

          {/* Synonyms */}
          {word.synonyms.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Related terms</p>
              <div className="flex flex-wrap gap-1.5">
                {word.synonyms.map((s) => (
                  <span key={s} className="rounded-md bg-white/5 border border-border/30 px-2.5 py-1 text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {word.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border/30">
              {word.tags.map((t) => (
                <span key={t} className="text-[10px] text-muted-foreground/50 rounded px-1.5 py-0.5 bg-white/3">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Practice CTA */}
          <Link
            href={`/vocabulary/flashcards?mode=single`}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
          >
            <Layers className="h-4 w-4" />
            Practice in Flashcards
          </Link>
        </div>
      </div>
    </>
  )
}

// ─── Word Card ────────────────────────────────────────────────────────────────
function WordCard({ word, categoryMeta, onClick }: { word: AnyWord; categoryMeta: AnyCategoryMeta; onClick: () => void }) {
  const catMeta = categoryMeta[word.category]

  return (
    <button
      onClick={onClick}
      className="group text-left w-full rounded-2xl border border-border/50 bg-card/60 p-4 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all duration-200 active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-base font-semibold text-foreground leading-tight">{word.word}</p>
          <p className="font-mono text-xs text-brand-300/70 mt-0.5">{word.phonetic}</p>
        </div>
        <LevelBadge level={word.level} size="sm" />
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{word.definition}</p>

      <div className="flex items-center justify-between mt-3">
        <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded", catMeta.bg, catMeta.color)}>
          {catMeta.label}
        </span>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-brand-400 transition-colors" />
      </div>
    </button>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VocabularyPage() {
  const { track } = useTrack()
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeLevel, setActiveLevel] = useState<CEFRLevel | "all">("all")
  const [selectedWord, setSelectedWord] = useState<AnyWord | null>(null)
  const [dueCount, setDueCount] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)

  const activeVocab: AnyWord[] = track === "it" ? vocabulary : vocabularyGeneral
  const activeCategoryMeta: AnyCategoryMeta = track === "it" ? CATEGORY_META : CATEGORY_META_GENERAL

  useEffect(() => {
    setActiveCategory("all")
    setActiveLevel("all")
    setQuery("")
    setSelectedWord(null)
  }, [track])

  useEffect(() => {
    setDueCount(getDueCount(vocabulary))
  }, [])

  const filtered = useMemo(() => {
    let words = activeVocab

    if (activeCategory !== "all") {
      words = words.filter((w) => w.category === activeCategory)
    }
    if (activeLevel !== "all") {
      words = words.filter((w) => w.level === activeLevel)
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim()
      words = words.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.definition.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q)) ||
          w.synonyms.some((s) => s.toLowerCase().includes(q))
      )
    }

    return words
  }, [query, activeCategory, activeLevel, activeVocab])

  const categories = Object.entries(activeCategoryMeta) as [string, { label: string; color: string; bg: string; border: string }][]
  const totalCount = activeVocab.length
  const filteredCount = filtered.length

  const flashcardUrl = useMemo(() => {
    const p = new URLSearchParams()
    if (activeCategory !== "all") p.set("category", activeCategory)
    if (activeLevel !== "all") p.set("level", activeLevel)
    return `/vocabulary/flashcards${p.toString() ? "?" + p.toString() : ""}`
  }, [activeCategory, activeLevel])

  return (
    <>
      <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-5 pb-32 md:max-w-5xl overflow-x-hidden">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-foreground">Vocabulary</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {totalCount} words · <span className="text-amber-400 font-medium">{dueCount} due for review</span>
            </p>
          </div>
          <Link
            href={flashcardUrl}
            className="shrink-0 flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20"
          >
            <Layers className="h-4 w-4" />
            Flashcards
          </Link>
        </div>

        {/* ── Stats row ──────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total words",   value: totalCount, icon: BookOpen,  color: "text-brand-400" },
            { label: "Due today",     value: dueCount,   icon: Star,      color: "text-amber-400" },
            { label: "This filter",  value: filteredCount, icon: Search,  color: "text-emerald-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl border border-border/50 bg-card/60 p-3 text-center">
              <Icon className={cn("h-4 w-4 mx-auto mb-1", color)} />
              <p className="text-lg font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Search ─────────────────────────────────────────────── */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search words, definitions, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border/60 bg-card/60 pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground/40 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50 transition-all"
          />
          {query && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 hover:bg-white/5 transition-colors"
              onClick={() => { setQuery(""); searchRef.current?.focus() }}
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* ── Category Filter ─────────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
              activeCategory === "all"
                ? "bg-brand-500 border-brand-500 text-white"
                : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border bg-card/40"
            )}
          >
            All ({totalCount})
          </button>
          {categories.map(([cat, meta]) => {
            const count = activeVocab.filter((w) => w.category === cat).length
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? "all" : cat)}
                className={cn(
                  "shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                  isActive
                    ? cn(meta.bg, meta.color, meta.border, "border")
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border bg-card/40"
                )}
              >
                {meta.label} ({count})
              </button>
            )
          })}
        </div>

        {/* ── Level Filter ─────────────────────────────────────────── */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveLevel("all")}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
              activeLevel === "all"
                ? "bg-white/10 border-white/20 text-foreground"
                : "border-border/40 text-muted-foreground hover:text-foreground bg-card/40"
            )}
          >
            All levels
          </button>
          {ALL_LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(activeLevel === lvl ? "all" : lvl)}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                activeLevel === lvl
                  ? cn(LEVEL_COLORS[lvl], "border")
                  : "border-border/40 text-muted-foreground hover:text-foreground bg-card/40"
              )}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* ── Results count ─────────────────────────────────────────── */}
        {(query || activeCategory !== "all" || activeLevel !== "all") && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredCount === 0
                ? "No words found"
                : `${filteredCount} word${filteredCount !== 1 ? "s" : ""}`}
            </p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("all"); setActiveLevel("all") }}
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* ── Word Grid ─────────────────────────────────────────────── */}
        {filteredCount === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-white/5 border border-border/30 flex items-center justify-center">
              <Search className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">No words found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
            <button
              onClick={() => { setQuery(""); setActiveCategory("all"); setActiveLevel("all") }}
              className="rounded-xl bg-brand-500/10 border border-brand-500/20 px-4 py-2 text-sm font-medium text-brand-300 hover:bg-brand-500/20 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                categoryMeta={activeCategoryMeta}
                onClick={() => setSelectedWord(word)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Sticky CTA bar ─────────────────────────────────────────── */}
      <div className="fixed bottom-20 md:bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-2 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none md:left-60">
        <Link
          href={flashcardUrl}
          className="pointer-events-auto flex items-center justify-center gap-2 w-full max-w-md mx-auto rounded-2xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand-500/25 hover:bg-brand-600 transition-all active:scale-[0.98]"
        >
          <Layers className="h-4 w-4" />
          Start Flashcard Session
          {dueCount > 0 && (
            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
              {dueCount} due
            </span>
          )}
        </Link>
      </div>

      {/* ── Word Detail Sheet ─────────────────────────────────────────── */}
      {selectedWord && (
        <WordSheet word={selectedWord} categoryMeta={activeCategoryMeta} onClose={() => setSelectedWord(null)} />
      )}
    </>
  )
}
