"use client"

import type { SkillArea } from "@/lib/utils"
import { readActivity, countSRSWordsLearned } from "@/lib/hooks/useSkillActivity"

const TOTAL_VOCAB_WORDS = 280

function clamp(v: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Math.round(v)))
}

/**
 * Computes live 0-100 skill scores.
 * baselineScores = the hardcoded starting point from data/user.ts
 * Activity in localStorage increases each score above its baseline (never below).
 */
export function computeSkillScores(
  baselineScores: Record<SkillArea, number>
): Record<SkillArea, number> {
  const activity = readActivity()

  // Vocabulary: real SRS data — how many of 280 words have been reviewed at least once
  const srsLearned = countSRSWordsLearned()
  const vocabFromSRS = Math.round((srsLearned / TOTAL_VOCAB_WORDS) * 100)
  const vocabulary = clamp(Math.max(baselineScores.vocabulary, vocabFromSRS))

  // Speaking: +1% per 2 user turns sent in conversations
  const speaking = clamp(baselineScores.speaking + Math.floor(activity.userTurnsSent / 2))

  // Listening: +1% per 2 AI turns received
  const listening = clamp(baselineScores.listening + Math.floor(activity.aiTurnsReceived / 2))

  // Writing: same as speaking (both come from typed messages in conversations)
  const writing = clamp(baselineScores.writing + Math.floor(activity.userTurnsSent / 2))

  // Grammar: +2% per grammar note encountered (actively learning rules)
  const grammar = clamp(baselineScores.grammar + activity.grammarNotesEncountered * 2)

  // Reading: +1% per 3 vocabulary cards flipped (reading definitions)
  const reading = clamp(baselineScores.reading + Math.floor(activity.vocabWordsFlipped / 3))

  return { speaking, listening, reading, writing, vocabulary, grammar }
}
