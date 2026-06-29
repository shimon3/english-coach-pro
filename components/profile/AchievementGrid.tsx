import { AchievementBadge } from "./AchievementBadge"
import type { Achievement } from "@/data/achievements"

interface AchievementGridProps {
  achievements: Achievement[]
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  const unlocked = achievements.filter((a) => a.isUnlocked)
  const locked = achievements.filter((a) => !a.isUnlocked)
  const sorted = [...unlocked, ...locked]

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-foreground">Achievements</p>
        <span className="text-xs text-muted-foreground">
          {unlocked.length}/{achievements.length} unlocked
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
        {sorted.map((a) => (
          <AchievementBadge key={a.id} achievement={a} />
        ))}
      </div>
    </div>
  )
}
