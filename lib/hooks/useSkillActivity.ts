"use client"

const ACTIVITY_KEY = "ecp-skill-activity"

export interface SkillActivity {
  userTurnsSent: number          // speaking + writing
  aiTurnsReceived: number        // listening
  grammarNotesEncountered: number // grammar
  flashcardsReviewed: number     // vocabulary
  vocabWordsFlipped: number      // reading
  conversationsCompleted: number
}

const DEFAULT_ACTIVITY: SkillActivity = {
  userTurnsSent: 0,
  aiTurnsReceived: 0,
  grammarNotesEncountered: 0,
  flashcardsReviewed: 0,
  vocabWordsFlipped: 0,
  conversationsCompleted: 0,
}

export function readActivity(): SkillActivity {
  if (typeof window === "undefined") return { ...DEFAULT_ACTIVITY }
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY)
    if (!raw) return { ...DEFAULT_ACTIVITY }
    return { ...DEFAULT_ACTIVITY, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_ACTIVITY }
  }
}

export function incrementActivity(field: keyof SkillActivity, amount = 1): void {
  if (typeof window === "undefined") return
  try {
    const current = readActivity()
    current[field] = (current[field] ?? 0) + amount
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(current))
  } catch {}
}

export function countSRSWordsLearned(): number {
  if (typeof window === "undefined") return 0
  try {
    let count = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key?.startsWith("ecp-srs-")) continue
      const raw = localStorage.getItem(key)
      if (!raw) continue
      const srs = JSON.parse(raw)
      if (srs.repetitions > 0) count++
    }
    return count
  } catch {
    return 0
  }
}
