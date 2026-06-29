"use client"

import { useState, useEffect } from "react"
import { Target, Globe, Bell, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { readSettings, writeSettings } from "@/lib/hooks/useSettings"
import type { UserSettings } from "@/lib/hooks/useSettings"

const GOAL_OPTIONS = [100, 200, 300, 500]
const ACCENT_OPTIONS: { value: UserSettings["preferredAccent"]; label: string }[] = [
  { value: "US", label: "US English" },
  { value: "UK", label: "UK English" },
  { value: "AU", label: "Australian English" },
  { value: "CA", label: "Canadian English" },
]

export function SettingsPanel() {
  const [settings, setSettings] = useState<UserSettings>(readSettings())
  const [editingGoal, setEditingGoal] = useState(false)
  const [editingAccent, setEditingAccent] = useState(false)

  useEffect(() => {
    setSettings(readSettings())
  }, [])

  function update(patch: Partial<UserSettings>) {
    const next = { ...settings, ...patch }
    setSettings(next)
    writeSettings(next)
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4 space-y-3 pb-6">
      <p className="text-sm font-semibold text-foreground">Settings</p>

      {/* Daily Goal */}
      <div className="border-b border-border/40 pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-4 w-4 text-brand-400" />
            <div>
              <p className="text-sm font-medium text-foreground">Daily Goal</p>
              <p className="text-xs text-muted-foreground">{settings.dailyGoalXP} XP per day</p>
            </div>
          </div>
          <button
            onClick={() => { setEditingGoal(!editingGoal); setEditingAccent(false) }}
            className="text-xs text-brand-400 font-medium hover:text-brand-300 transition-colors"
          >
            {editingGoal ? "Done" : "Change"}
          </button>
        </div>

        {editingGoal && (
          <div className="flex gap-2 flex-wrap pt-1">
            {GOAL_OPTIONS.map((xp) => (
              <button
                key={xp}
                onClick={() => { update({ dailyGoalXP: xp }); setEditingGoal(false) }}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                  settings.dailyGoalXP === xp
                    ? "bg-brand-500 border-brand-500 text-white"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-brand-500/40 bg-card/40"
                )}
              >
                {settings.dailyGoalXP === xp && <Check className="h-3 w-3" />}
                {xp} XP
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Preferred Accent */}
      <div className="border-b border-border/40 pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="h-4 w-4 text-brand-400" />
            <div>
              <p className="text-sm font-medium text-foreground">Preferred Accent</p>
              <p className="text-xs text-muted-foreground">
                {ACCENT_OPTIONS.find(a => a.value === settings.preferredAccent)?.label}
              </p>
            </div>
          </div>
          <button
            onClick={() => { setEditingAccent(!editingAccent); setEditingGoal(false) }}
            className="text-xs text-brand-400 font-medium hover:text-brand-300 transition-colors"
          >
            {editingAccent ? "Done" : "Change"}
          </button>
        </div>

        {editingAccent && (
          <div className="flex gap-2 flex-wrap pt-1">
            {ACCENT_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => { update({ preferredAccent: value }); setEditingAccent(false) }}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                  settings.preferredAccent === value
                    ? "bg-brand-500 border-brand-500 text-white"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-brand-500/40 bg-card/40"
                )}
              >
                {settings.preferredAccent === value && <Check className="h-3 w-3" />}
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reminders toggle */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-3">
          <Bell className="h-4 w-4 text-brand-400" />
          <div>
            <p className="text-sm font-medium text-foreground">Reminders</p>
            <p className="text-xs text-muted-foreground">
              {settings.remindersEnabled ? "Daily at 8:00 AM" : "Disabled"}
            </p>
          </div>
        </div>
        <button
          onClick={() => update({ remindersEnabled: !settings.remindersEnabled })}
          className={cn(
            "h-5 w-10 rounded-full flex items-center transition-colors duration-200",
            settings.remindersEnabled ? "bg-brand-500 justify-end pr-0.5" : "bg-white/10 justify-start pl-0.5"
          )}
          aria-label="Toggle reminders"
        >
          <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
        </button>
      </div>
    </div>
  )
}
