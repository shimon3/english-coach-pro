import {
  Star, Flame, BookOpen, CheckCircle, Monitor,
  Mic, Headphones, MessageCircle, Server, Trophy,
  Shield, Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Achievement, AchievementRarity } from "@/data/achievements"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Star, Flame, BookOpen, CheckCircle, Monitor,
  Mic, Headphones, MessageCircle, Server, Trophy, Shield, Zap,
}

const rarityStyles: Record<AchievementRarity, { ring: string; glow: string; badge: string }> = {
  common:    { ring: "border-white/10",         glow: "",                          badge: "text-gray-400 bg-gray-400/10" },
  rare:      { ring: "border-brand-500/30",      glow: "shadow-brand-500/20",       badge: "text-brand-300 bg-brand-500/15" },
  epic:      { ring: "border-purple-500/40",     glow: "shadow-purple-500/25",      badge: "text-purple-300 bg-purple-500/15" },
  legendary: { ring: "border-yellow-400/50",     glow: "shadow-yellow-400/30",      badge: "text-yellow-300 bg-yellow-400/15" },
}

interface AchievementBadgeProps {
  achievement: Achievement
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const Icon = iconMap[achievement.iconName] ?? Star
  const styles = rarityStyles[achievement.rarity]
  const { isUnlocked, progress, progressMax } = achievement

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all",
        styles.ring,
        isUnlocked
          ? cn("bg-card/80", styles.glow && `shadow-md ${styles.glow}`)
          : "bg-card/30 opacity-50 grayscale"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          isUnlocked ? styles.badge : "bg-white/5 text-muted-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-center">
        <p className="text-[11px] font-semibold text-foreground leading-tight">{achievement.title}</p>
        {!isUnlocked && progress !== undefined && progressMax && (
          <p className="text-[9px] text-muted-foreground mt-0.5">
            {progress}/{progressMax}
          </p>
        )}
        {isUnlocked && (
          <p className="text-[9px] text-success mt-0.5">Unlocked</p>
        )}
      </div>
    </div>
  )
}
