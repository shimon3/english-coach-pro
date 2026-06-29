"use client"

import { useState, useMemo, useEffect } from "react"
import { conversations, CATEGORY_META } from "@/data/conversations"
import { conversationsGeneral, CATEGORY_META_GENERAL } from "@/data/conversations-general"
import type { ConversationScenario } from "@/data/conversations"
import type { ConversationScenarioGeneral } from "@/data/conversations-general"
import { useTrack } from "@/lib/track-context"
import type { CEFRLevel } from "@/lib/utils"
import { ScenarioCard } from "@/components/conversations/ScenarioCard"
import { getCompletedScenarioIds } from "@/lib/hooks/useCompletedItems"
import { cn } from "@/lib/utils"
import { MessageSquare, Globe, Monitor } from "lucide-react"

type AnyScenario = ConversationScenario | ConversationScenarioGeneral
type AnyCategoryMeta = Record<string, { label: string; color: string; bg: string; border: string }>
const DIFFICULTIES: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1"]

export default function ConversationsPage() {
  const { track } = useTrack()
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeDifficulty, setActiveDifficulty] = useState<CEFRLevel | "all">("all")
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  const activeConversations: AnyScenario[] = track === "it" ? conversations : conversationsGeneral
  const activeCategoryMeta: AnyCategoryMeta = track === "it" ? CATEGORY_META : CATEGORY_META_GENERAL
  const allCategories = Object.keys(activeCategoryMeta)

  useEffect(() => {
    setCompletedIds(getCompletedScenarioIds())
  }, [])

  useEffect(() => {
    setActiveCategory("all")
    setActiveDifficulty("all")
  }, [track])

  const filtered = useMemo(() => {
    return activeConversations.filter((s) => {
      if (activeCategory !== "all" && s.category !== activeCategory) return false
      if (activeDifficulty !== "all" && s.difficulty !== activeDifficulty) return false
      return true
    })
  }, [activeCategory, activeDifficulty, activeConversations])

  const totalMinutes = activeConversations.reduce((sum, s) => sum + s.estimatedMinutes, 0)

  const introText = track === "it"
    ? { title: "Practice real IT conversations", desc: "Scripted role-plays based on real sysadmin situations — helpdesk, incidents, meetings and more." }
    : { title: "Practice everyday English conversations", desc: "Scripted role-plays covering daily life, travel, health, work and social situations." }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-4xl mx-auto space-y-5 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Conversations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {activeConversations.length} scenarios · {completedIds.size}/{activeConversations.length} completed · ~{totalMinutes} min total
        </p>
      </div>

      {/* Intro card */}
      <div className={cn(
        "rounded-2xl border p-4",
        track === "it" ? "border-brand-500/20 bg-brand-500/5" : "border-sky-500/20 bg-sky-500/5"
      )}>
        <div className="flex items-start gap-3">
          <div className={cn(
            "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
            track === "it" ? "bg-brand-500/15" : "bg-sky-500/15"
          )}>
            {track === "it"
              ? <Monitor className="h-4 w-4 text-brand-400" />
              : <Globe className="h-4 w-4 text-sky-400" />
            }
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-0.5">{introText.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{introText.desc}</p>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
            activeCategory === "all"
              ? "bg-brand-500 border-brand-500 text-white"
              : "border-border/60 text-muted-foreground hover:text-foreground bg-card/40"
          )}
        >
          All ({activeConversations.length})
        </button>
        {allCategories.map((cat) => {
          const meta = activeCategoryMeta[cat]
          const count = activeConversations.filter((s) => s.category === cat).length
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(isActive ? "all" : cat)}
              className={cn(
                "shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                isActive
                  ? cn(meta.bg, meta.color, meta.border, "border")
                  : "border-border/60 text-muted-foreground hover:text-foreground bg-card/40"
              )}
            >
              {meta.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveDifficulty("all")}
          className={cn(
            "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
            activeDifficulty === "all"
              ? "bg-white/10 border-white/20 text-foreground"
              : "border-border/40 text-muted-foreground hover:text-foreground bg-card/40"
          )}
        >
          All levels
        </button>
        {DIFFICULTIES.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setActiveDifficulty(activeDifficulty === lvl ? "all" : lvl)}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
              activeDifficulty === lvl
                ? "bg-brand-500/15 border-brand-500/30 text-brand-300"
                : "border-border/40 text-muted-foreground hover:text-foreground bg-card/40"
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Scenario grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="h-16 w-16 rounded-2xl bg-white/5 border border-border/30 flex items-center justify-center">
            <MessageSquare className="h-7 w-7 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">No scenarios found</p>
            <p className="text-sm text-muted-foreground mt-1">Try clearing your filters</p>
          </div>
          <button
            onClick={() => { setActiveCategory("all"); setActiveDifficulty("all") }}
            className="rounded-xl bg-brand-500/10 border border-brand-500/20 px-4 py-2 text-sm font-medium text-brand-300 hover:bg-brand-500/20 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario as ConversationScenario} isCompleted={completedIds.has(scenario.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
