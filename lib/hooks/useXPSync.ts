"use client"

import { useCallback } from "react"
import { markActiveToday } from "@/lib/hooks/useStreak"

const XP_KEY = "ecp-xp"

interface StoredXP {
  totalXP: number
  todayXP: number
  todayDate: string
}

const DEFAULT: StoredXP = { totalXP: 2840, todayXP: 180, todayDate: "" }

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0]
}

export function readXP(): { totalXP: number; todayXP: number } {
  if (typeof window === "undefined") return { totalXP: DEFAULT.totalXP, todayXP: DEFAULT.todayXP }
  try {
    const raw = localStorage.getItem(XP_KEY)
    if (!raw) return { totalXP: DEFAULT.totalXP, todayXP: DEFAULT.todayXP }
    const stored: StoredXP = JSON.parse(raw)
    // Reset todayXP if it's a new day
    if (stored.todayDate !== getTodayISO()) {
      return { totalXP: stored.totalXP, todayXP: 0 }
    }
    return { totalXP: stored.totalXP, todayXP: stored.todayXP }
  } catch {
    return { totalXP: DEFAULT.totalXP, todayXP: DEFAULT.todayXP }
  }
}

function writeXP(totalXP: number, todayXP: number): void {
  if (typeof window === "undefined") return
  const stored: StoredXP = { totalXP, todayXP, todayDate: getTodayISO() }
  localStorage.setItem(XP_KEY, JSON.stringify(stored))
}

export function useXPSync() {
  const addXP = useCallback((amount: number) => {
    const current = readXP()
    writeXP(current.totalXP + amount, current.todayXP + amount)
    markActiveToday()
  }, [])

  return { addXP, readXP }
}
