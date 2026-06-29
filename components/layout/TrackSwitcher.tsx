"use client"

import { useTrack } from "@/lib/track-context"
import { Monitor, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function TrackSwitcher() {
  const { track, setTrack } = useTrack()

  return (
    <div className="flex items-center rounded-xl bg-white/5 border border-border/40 p-0.5 w-full">
      <button
        onClick={() => setTrack("general")}
        className={cn(
          "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all",
          track === "general"
            ? "bg-brand-500 text-white shadow-sm shadow-brand-500/30"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Globe className="h-3.5 w-3.5 shrink-0" />
        <span>General</span>
      </button>
      <button
        onClick={() => setTrack("it")}
        className={cn(
          "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all",
          track === "it"
            ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Monitor className="h-3.5 w-3.5 shrink-0" />
        <span>IT English</span>
      </button>
    </div>
  )
}
