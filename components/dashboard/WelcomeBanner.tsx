import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface WelcomeBannerProps {
  name: string
  streakDays: number
  level: string
  sublevel: number
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

export function WelcomeBanner({ name, streakDays, level, sublevel }: WelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-900/60 via-brand-800/30 to-transparent p-5">
      {/* Background glow */}
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-brand-300/70 mb-0.5">{getGreeting()},</p>
          <h1 className="text-xl font-bold text-foreground">{name} 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You&apos;re on level{" "}
            <span className="font-semibold text-brand-300">
              {level}·{sublevel}
            </span>
            . Keep it up!
          </p>
        </div>

        <div className="flex flex-col items-center shrink-0 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2">
          <Flame className="h-5 w-5 text-orange-400" />
          <span className="text-lg font-bold text-orange-300 leading-none">{streakDays}</span>
          <span className="text-[10px] font-medium text-orange-400/70">{streakDays === 1 ? "day" : "days"}</span>
        </div>
      </div>
    </div>
  )
}
