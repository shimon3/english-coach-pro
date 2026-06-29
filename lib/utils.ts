import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
export type SkillArea = "speaking" | "listening" | "reading" | "writing" | "vocabulary" | "grammar"
export type WordCategory = "tech" | "business" | "academic" | "idioms" | "phrasal-verbs" | "general" | "cybersecurity" | "networking"
export type Accent = "US" | "UK" | "AU" | "CA"
export type ITScenario = "email" | "standup" | "code-review" | "documentation" | "interview" | "async"

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}

export function getLevelColors(level: CEFRLevel) {
  const map: Record<CEFRLevel, { text: string; bg: string; border: string }> = {
    A1: { text: "text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20" },
    A2: { text: "text-gray-300", bg: "bg-gray-300/10", border: "border-gray-300/20" },
    B1: { text: "text-brand-300", bg: "bg-brand-500/15", border: "border-brand-500/30" },
    B2: { text: "text-brand-200", bg: "bg-brand-500/20", border: "border-brand-400/40" },
    C1: { text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-400/30" },
    C2: { text: "text-yellow-300", bg: "bg-yellow-400/15", border: "border-yellow-300/40" },
  }
  return map[level]
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { weekday: "short" })
}
