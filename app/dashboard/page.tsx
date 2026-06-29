import { currentUser, weeklyActivity, recommendedLessons, recentActivity } from "@/data/user"
import { DashboardProgress } from "@/components/dashboard/DashboardProgress"
import { WeeklyActivityChart } from "@/components/dashboard/WeeklyActivityChart"
import { SkillRadarWrapper } from "@/components/dashboard/SkillRadarWrapper"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecommendedCard } from "@/components/dashboard/RecommendedCard"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { formatShortDate } from "@/lib/utils"
import { Zap } from "lucide-react"

export default function DashboardPage() {
  const user = currentUser

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-4 md:max-w-5xl">
      {/* Welcome + Stats row — reads live from localStorage */}
      <DashboardProgress />

      {/* Continue learning */}
      <div className="space-y-2">
        <SectionHeader title="Continue Learning" />
        <RecommendedCard lesson={recommendedLessons[0]} featured />
      </div>

      {/* Quick access */}
      <QuickActions />

      {/* Weekly chart + skill radar */}
      <div className="grid gap-3 md:grid-cols-2">
        <WeeklyActivityChart data={weeklyActivity} />
        <SkillRadarWrapper baselineScores={user.skillScores} />
      </div>

      {/* Recommended */}
      <div className="space-y-2">
        <SectionHeader title="Recommended for You" action={{ label: "See all", href: "/vocabulary" }} />
        <div className="space-y-2">
          {recommendedLessons.slice(1).map((lesson) => (
            <RecommendedCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="space-y-2 pb-4">
        <SectionHeader title="Recent Activity" />
        <div className="rounded-2xl border border-border/60 bg-card/60 divide-y divide-border/40">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground/70 mb-0.5">{item.module}</p>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-brand-400">
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-semibold">+{item.xp}</span>
                </div>
                <span className="text-[10px] text-muted-foreground/50">{formatShortDate(item.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
