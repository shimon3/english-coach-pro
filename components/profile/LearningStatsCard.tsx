import { Flame, BookOpen, Clock } from "lucide-react"
import { formatMinutes } from "@/lib/utils"

interface LearningStatsCardProps {
  streakDays: number
  wordsLearned: number
  studyMinutes: number
}

const stats = (streak: number, words: number, minutes: number) => [
  { icon: Flame, label: "Day Streak", value: streak.toString(), color: "text-orange-400", bg: "bg-orange-400/10" },
  { icon: BookOpen, label: "Words Learned", value: words.toLocaleString(), color: "text-brand-400", bg: "bg-brand-400/10" },
  { icon: Clock, label: "Study Time", value: formatMinutes(minutes), color: "text-emerald-400", bg: "bg-emerald-400/10" },
]

export function LearningStatsCard({ streakDays, wordsLearned, studyMinutes }: LearningStatsCardProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats(streakDays, wordsLearned, studyMinutes).map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/60 p-3"
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.bg}`}>
            <s.icon className={`h-4.5 w-4.5 ${s.color}`} />
          </div>
          <span className="text-lg font-bold text-foreground leading-none">{s.value}</span>
          <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
