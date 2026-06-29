import Link from "next/link"
import { ArrowRight, FileText, Mic, BookOpen, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProgressBar } from "@/components/shared/ProgressBar"
import type { RecommendedLesson } from "@/data/user"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Mic, BookOpen,
}

interface RecommendedCardProps {
  lesson: RecommendedLesson
  featured?: boolean
}

export function RecommendedCard({ lesson, featured }: RecommendedCardProps) {
  const Icon = iconMap[lesson.iconName] ?? BookOpen

  return (
    <Link href={lesson.href} className="block group">
      <div
        className={cn(
          "rounded-2xl border border-border/60 bg-card/60 p-4 transition-all duration-200",
          "hover:border-brand-500/40 hover:bg-card hover:shadow-lg hover:shadow-brand-500/5",
          featured && "border-brand-500/30 bg-brand-900/20"
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              featured ? "bg-brand-500/20" : "bg-white/6"
            )}
          >
            <Icon className={cn("h-5 w-5", featured ? "text-brand-400" : "text-muted-foreground")} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400/80 mb-0.5">
              {lesson.module}
            </p>
            <p className="text-sm font-semibold text-foreground truncate">{lesson.title}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{lesson.estimatedMinutes}m</span>
              </div>
              <div className="flex items-center gap-1 text-brand-400">
                <Zap className="h-3 w-3" />
                <span className="text-xs font-medium">+{lesson.xpReward} XP</span>
              </div>
            </div>
            {lesson.progressPercent > 0 && (
              <div className="mt-2">
                <ProgressBar value={lesson.progressPercent} max={100} variant="slim" />
              </div>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand-400 transition-colors shrink-0 mt-0.5" />
        </div>
      </div>
    </Link>
  )
}
