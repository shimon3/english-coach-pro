import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LevelBadge } from "@/components/shared/LevelBadge"
import { Briefcase, MapPin } from "lucide-react"
import type { User } from "@/data/user"

export function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-900/50 via-brand-800/20 to-transparent p-6">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-500/8 blur-3xl" />
      <div className="relative flex items-start gap-4">
        <Avatar className="h-16 w-16 border-2 border-brand-500/40 shadow-xl shadow-brand-500/20">
          <AvatarFallback className="bg-brand-500/25 text-brand-200 text-xl font-bold">
            {user.avatarInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            <span className="text-lg">{user.countryFlag}</span>
            <LevelBadge level={user.currentLevel} sublevel={user.sublevel} size="sm" />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" />
              {user.jobTitle}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {user.country}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {user.nativeLanguages.map((lang) => (
              <span
                key={lang}
                className="rounded-md bg-white/6 border border-border/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {lang}
              </span>
            ))}
            <span className="rounded-md bg-white/6 border border-border/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              Learning English
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
