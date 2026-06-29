"use client"

import { useState, useCallback, useEffect } from "react"
import type { VocabularyWord } from "@/data/vocabulary"
import { incrementActivity } from "@/lib/hooks/useSkillActivity"

export type SRSRating = 1 | 2 | 3 | 4 // Again / Hard / Good / Easy

export interface SRSRecord {
  easeFactor: number    // starts at 2.5, min 1.3, max 3.0
  interval: number      // days until next review
  repetitions: number
  nextReview: string    // ISO date string
  lastReview: string    // ISO date string
}

export interface FlashcardSessionCard {
  word: VocabularyWord
  srs: SRSRecord
  ratingGiven: SRSRating | null
  attemptCount: number
}

export interface FlashcardSessionState {
  cards: FlashcardSessionCard[]
  currentIndex: number
  isFlipped: boolean
  isComplete: boolean
  dueCount: number
}

const SRS_KEY = (id: string) => `ecp-srs-${id}`

const DEFAULT_SRS: SRSRecord = {
  easeFactor: 2.5,
  interval: 1,
  repetitions: 0,
  nextReview: new Date().toISOString().split("T")[0],
  lastReview: "",
}

function loadSRS(wordId: string): SRSRecord {
  if (typeof window === "undefined") return DEFAULT_SRS
  try {
    const raw = localStorage.getItem(SRS_KEY(wordId))
    return raw ? (JSON.parse(raw) as SRSRecord) : { ...DEFAULT_SRS }
  } catch {
    return { ...DEFAULT_SRS }
  }
}

function saveSRS(wordId: string, record: SRSRecord) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(SRS_KEY(wordId), JSON.stringify(record))
  } catch {
    // storage full — ignore
  }
}

function nextSRS(current: SRSRecord, rating: SRSRating): SRSRecord {
  const today = new Date().toISOString().split("T")[0]
  let { easeFactor, interval, repetitions } = current

  if (rating === 1) {
    // Again: reset
    interval = 1
    repetitions = 0
  } else if (rating === 2) {
    // Hard: grow slowly, reduce ease
    interval = Math.max(1, Math.round(interval * 1.2))
    easeFactor = Math.max(1.3, easeFactor - 0.15)
  } else if (rating === 3) {
    // Good: standard SM-2 growth
    interval = repetitions === 0 ? 1 : repetitions === 1 ? 6 : Math.round(interval * easeFactor)
    repetitions++
  } else {
    // Easy: bonus growth, boost ease
    interval = repetitions === 0 ? 4 : Math.round(interval * easeFactor * 1.3)
    easeFactor = Math.min(3.0, easeFactor + 0.15)
    repetitions++
  }

  const next = new Date()
  next.setDate(next.getDate() + interval)

  return {
    easeFactor,
    interval,
    repetitions,
    nextReview: next.toISOString().split("T")[0],
    lastReview: today,
  }
}

export function isDue(srs: SRSRecord): boolean {
  const today = new Date().toISOString().split("T")[0]
  return srs.nextReview <= today
}

export function getDueCount(words: VocabularyWord[]): number {
  return words.filter((w) => isDue(loadSRS(w.id))).length
}

export function useFlashcardSession(words: VocabularyWord[]) {
  const [session, setSession] = useState<FlashcardSessionState>(() => {
    const cards: FlashcardSessionCard[] = words.map((w) => ({
      word: w,
      srs: loadSRS(w.id),
      ratingGiven: null,
      attemptCount: 0,
    }))
    return {
      cards,
      currentIndex: 0,
      isFlipped: false,
      isComplete: words.length === 0,
      dueCount: cards.filter((c) => isDue(c.srs)).length,
    }
  })

  const current = session.cards[session.currentIndex] ?? null

  const flip = useCallback(() => {
    setSession((s) => {
      // Track reading activity only when revealing the definition (front → back)
      if (!s.isFlipped) incrementActivity("vocabWordsFlipped")
      return { ...s, isFlipped: !s.isFlipped }
    })
  }, [])

  const rate = useCallback((rating: SRSRating) => {
    setSession((prev) => {
      const cards = [...prev.cards]
      const idx = prev.currentIndex
      const card = { ...cards[idx] }

      // Calculate new SRS and save to localStorage
      const newSRS = nextSRS(card.srs, rating)
      saveSRS(card.word.id, newSRS)
      incrementActivity("flashcardsReviewed")

      card.srs = newSRS
      card.ratingGiven = rating
      card.attemptCount++
      cards[idx] = card

      // "Again" cards go back into the queue at current position + 3 (or end)
      let nextIndex = idx + 1
      if (rating === 1) {
        const requeue = { ...card, ratingGiven: null }
        const insertAt = Math.min(idx + 3, cards.length)
        cards.splice(insertAt, 0, requeue)
      }

      const isComplete = nextIndex >= cards.filter((c) => c.ratingGiven !== null || cards.indexOf(c) < nextIndex).length
        && cards.every((c, i) => i < nextIndex || c.ratingGiven !== null)

      // Check if we've reached the end of all non-requeued cards
      const remaining = cards.slice(nextIndex).filter((c) => c.ratingGiven === null)
      const done = nextIndex >= cards.length

      return {
        ...prev,
        cards,
        currentIndex: nextIndex,
        isFlipped: false,
        isComplete: done,
      }
    })
  }, [])

  const restart = useCallback(() => {
    const cards: FlashcardSessionCard[] = words.map((w) => ({
      word: w,
      srs: loadSRS(w.id),
      ratingGiven: null,
      attemptCount: 0,
    }))
    setSession({
      cards,
      currentIndex: 0,
      isFlipped: false,
      isComplete: words.length === 0,
      dueCount: cards.filter((c) => isDue(c.srs)).length,
    })
  }, [words])

  const progress = session.cards.length === 0
    ? 0
    : Math.round((session.currentIndex / session.cards.length) * 100)

  const ratingCounts = session.cards.reduce(
    (acc, c) => {
      if (c.ratingGiven) acc[c.ratingGiven] = (acc[c.ratingGiven] ?? 0) + 1
      return acc
    },
    {} as Record<SRSRating, number>
  )

  return {
    current,
    session,
    progress,
    ratingCounts,
    totalCards: session.cards.length,
    currentCardNumber: session.currentIndex + 1,
    flip,
    rate,
    restart,
  }
}
