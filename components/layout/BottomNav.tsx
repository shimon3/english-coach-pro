"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Globe, Monitor, GraduationCap, User } from "lucide-react"
import { useTrack, type Track } from "@/lib/track-context"
import { cn } from "@/lib/utils"

const CONTENT_PATHS = ["/vocabulary", "/conversations", "/pronunciation", "/listening"]

interface NavTab {
  icon: typeof LayoutDashboard
  label: string
  href: string
  track?: Track
  isActive: (pathname: string, track: Track) => boolean
  activeClass: string
  glowClass: string
}

const TABS: NavTab[] = [
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/dashboard",
    isActive: (p) => p.startsWith("/dashboard"),
    activeClass: "text-brand-400",
    glowClass: "drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]",
  },
  {
    icon: Globe,
    label: "English",
    href: "/conversations",
    track: "general",
    isActive: (p, t) => t === "general" && CONTENT_PATHS.some((c) => p.startsWith(c)),
    activeClass: "text-sky-400",
    glowClass: "drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]",
  },
  {
    icon: Monitor,
    label: "IT",
    href: "/conversations",
    track: "it",
    isActive: (p, t) => t === "it" && CONTENT_PATHS.some((c) => p.startsWith(c)),
    activeClass: "text-emerald-400",
    glowClass: "drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]",
  },
  {
    icon: GraduationCap,
    label: "Grammar",
    href: "/grammar",
    isActive: (p) => p.startsWith("/grammar"),
    activeClass: "text-brand-400",
    glowClass: "drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
    isActive: (p) => p.startsWith("/profile"),
    activeClass: "text-brand-400",
    glowClass: "drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]",
  },
]

export function BottomNav() {
  const pathname = usePathname()
  const { track, setTrack } = useTrack()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="border-t border-border/60 bg-card/95 backdrop-blur-md pb-safe">
        <div className="flex items-stretch">
          {TABS.map((tab) => {
            const isActive = tab.isActive(pathname, track)
            return (
              <Link
                key={tab.label}
                href={tab.href}
                onClick={() => { if (tab.track) setTrack(tab.track) }}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-all duration-150",
                  isActive ? tab.activeClass : "text-muted-foreground"
                )}
              >
                <tab.icon className={cn("h-5 w-5 shrink-0", isActive && tab.glowClass)} />
                <span className="text-[9px] font-medium leading-none">{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
