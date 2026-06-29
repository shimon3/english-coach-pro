import Link from "next/link"
import { cn } from "@/lib/utils"
import { LevelBadge } from "@/components/shared/LevelBadge"
import { CATEGORY_META } from "@/data/conversations"
import type { ConversationScenario } from "@/data/conversations"
import { Clock, Zap, CheckCircle2, ChevronRight } from "lucide-react"

type CategoryMeta = Record<string, { label: string; color: string; bg: string; border: string }>

interface ScenarioCardProps {
  scenario: ConversationScenario
  isCompleted?: boolean
  categoryMeta?: CategoryMeta
}

export function ScenarioCard({ scenario, isCompleted = false, categoryMeta }: ScenarioCardProps) {
  const meta = categoryMeta ?? (CATEGORY_META as CategoryMeta)
  const catMeta = meta[scenario.category] ?? { label: scenario.category, color: "text-muted-foreground", bg: "bg-white/5", border: "border-border/30" }

  return (
    <Link
      href={`/conversations/${scenario.id}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-card/60 p-5 transition-all duration-200 hover:border-brand-500/40 hover:bg-brand-500/5 active:scale-[0.98]",
        isCompleted ? "border-emerald-500/30" : "border-border/50"
      )}
    >
      {isCompleted && (
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          <span className="text-[10px] font-semibold text-emerald-400">Done</span>
        </div>
      )}

      {/* Category + difficulty */}
      <div className="flex items-center gap-2 mb-3">
        <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md", catMeta.bg, catMeta.color)}>
          {catMeta.label}
        </span>
        <LevelBadge level={scenario.difficulty} size="xs" />
      </div>

      {/* Title + description */}
      <h3 className="text-base font-bold text-foreground leading-tight mb-1">
        {scenario.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
        {scenario.description}
      </p>

      {/* Roles */}
      <div className="mt-3 mb-3 rounded-lg bg-white/4 border border-border/30 px-3 py-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">You:</span> {scenario.userRole}
        <span className="mx-1.5 text-border">·</span>
        <span className="font-medium text-foreground">AI:</span> {scenario.aiName} ({scenario.aiRole})
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            ~{scenario.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1 text-brand-400 font-semibold">
            <Zap className="h-3 w-3" />
            {scenario.xpReward} XP
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand-400 transition-colors" />
      </div>
    </Link>
  )
}
