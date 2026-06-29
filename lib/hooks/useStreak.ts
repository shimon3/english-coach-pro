"use client"

const STREAK_KEY = "ecp-streak"

interface StoredStreak {
  streakDays: number
  lastActiveDate: string
}

// Default seeds — lastActiveDate set to today so first markActiveToday() doesn't reset the streak
function getDefaultStreak(): StoredStreak {
  return { streakDays: 14, lastActiveDate: getTodayISO() }
}

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0]
}

function getYesterdayISO(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split("T")[0]
}

export function readStreak(): StoredStreak {
  if (typeof window === "undefined") return getDefaultStreak()
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    if (!raw) return getDefaultStreak()
    return JSON.parse(raw) as StoredStreak
  } catch {
    return getDefaultStreak()
  }
}

function writeStreak(data: StoredStreak): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data))
  } catch {}
}

// Call this whenever the user does something active (earns XP, opens a session, etc.)
export function markActiveToday(): StoredStreak {
  const today = getTodayISO()
  const yesterday = getYesterdayISO()
  const current = readStreak()

  // Already marked today — nothing to do
  if (current.lastActiveDate === today) return current

  const newStreak =
    current.lastActiveDate === yesterday
      ? current.streakDays + 1  // consecutive day → extend
      : 1                         // gap → reset

  const updated: StoredStreak = { streakDays: newStreak, lastActiveDate: today }
  writeStreak(updated)
  return updated
}
