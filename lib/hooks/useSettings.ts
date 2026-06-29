"use client"

const SETTINGS_KEY = "ecp-settings"

export interface UserSettings {
  dailyGoalXP: number
  preferredAccent: "US" | "UK" | "AU" | "CA"
  remindersEnabled: boolean
}

const DEFAULT: UserSettings = {
  dailyGoalXP: 300,
  preferredAccent: "US",
  remindersEnabled: true,
}

export function readSettings(): UserSettings {
  if (typeof window === "undefined") return { ...DEFAULT }
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT }
    return { ...DEFAULT, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT }
  }
}

export function writeSettings(settings: UserSettings): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {}
}
