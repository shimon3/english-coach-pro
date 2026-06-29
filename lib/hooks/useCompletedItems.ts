"use client"

const GRAMMAR_KEY = "ecp-completed-grammar"
const SCENARIO_KEY = "ecp-completed-scenarios"

export interface CompletedScenario {
  id: string
  title: string
  completedAt: string   // ISO date
  xpEarned: number
}

// ─── Grammar lessons ─────────────────────────────────────────────────────────

export function readCompletedLessons(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(GRAMMAR_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch { return new Set() }
}

export function markLessonComplete(lessonId: string): void {
  if (typeof window === "undefined") return
  try {
    const current = readCompletedLessons()
    current.add(lessonId)
    localStorage.setItem(GRAMMAR_KEY, JSON.stringify([...current]))
  } catch {}
}

export function isLessonComplete(lessonId: string): boolean {
  return readCompletedLessons().has(lessonId)
}

// ─── Conversation scenarios ───────────────────────────────────────────────────

export function readCompletedScenarios(): CompletedScenario[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(SCENARIO_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function markScenarioComplete(id: string, title: string, xpEarned: number): void {
  if (typeof window === "undefined") return
  try {
    const current = readCompletedScenarios()
    const alreadyDone = current.find((s) => s.id === id)
    if (alreadyDone) return  // don't duplicate
    current.push({ id, title, completedAt: new Date().toISOString(), xpEarned })
    localStorage.setItem(SCENARIO_KEY, JSON.stringify(current))
  } catch {}
}

export function isScenarioComplete(id: string): boolean {
  return readCompletedScenarios().some((s) => s.id === id)
}

export function getCompletedScenarioIds(): Set<string> {
  return new Set(readCompletedScenarios().map((s) => s.id))
}
