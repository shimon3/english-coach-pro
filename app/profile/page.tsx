import { currentUser, monthlyActivity, recentActivity } from "@/data/user"
import { achievements } from "@/data/achievements"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { LiveStats } from "@/components/profile/LiveStats"
import { SettingsPanel } from "@/components/profile/SettingsPanel"
import { AchievementGrid } from "@/components/profile/AchievementGrid"
import { StreakCalendar } from "@/components/profile/StreakCalendar"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { formatShortDate } from "@/lib/utils"
import { Zap } from "lucide-react"

export default function ProfilePage() {
  const user = currentUser

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <ProfileHeader user={user} />

      {/* XP + Streak — reads live from localStorage */}
      <LiveStats />

      {/* Focus Topics */}
      <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
        <p className="text-sm font-semibold text-foreground mb-3">My Focus Topics</p>
        <div className="flex flex-wrap gap-2">
          {user.focusTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-lg bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 text-xs font-medium text-brand-300"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Activity heatmap */}
      <StreakCalendar activityLog={monthlyActivity} />

      {/* Achievements */}
      <AchievementGrid achievements={achievements} />

      {/* Recent activity */}
      <div className="space-y-2">
        <SectionHeader title="Recent Sessions" />
        <div className="rounded-2xl border border-border/60 bg-card/60 divide-y divide-border/40">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-400/70 mb-0.5">
                  {item.module}
                </p>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.durationMinutes} min · {formatShortDate(item.date)}</p>
              </div>
              <div className="flex items-center gap-1 text-brand-400">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">+{item.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings panel */}
      <SettingsPanel />
    </div>
  )
}
