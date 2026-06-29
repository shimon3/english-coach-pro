"use client"

import { usePathname } from "next/navigation"
import {
  LayoutDashboard, BookOpen, MessageCircle, Mic,
  Headphones, GraduationCap, Monitor, User, Zap,
} from "lucide-react"
import { NavItem } from "./NavItem"
import { TrackSwitcher } from "./TrackSwitcher"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Vocabulary", href: "/vocabulary" },
  { icon: MessageCircle, label: "AI Conversations", href: "/conversations" },
  { icon: Mic, label: "Pronunciation", href: "/pronunciation" },
  { icon: Headphones, label: "Listening", href: "/listening" },
  { icon: GraduationCap, label: "Grammar", href: "/grammar" },
  { icon: Monitor, label: "IT English", href: "/it-english" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 flex-col bg-sidebar border-r border-sidebar-border z-30">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-lg shadow-brand-500/30">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">English Coach</p>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Pro</p>
        </div>
      </div>

      {/* Track switcher */}
      <div className="px-3 py-3 border-b border-sidebar-border/50">
        <TrackSwitcher />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Learn
        </p>
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname.startsWith(item.href)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border/50">
        <p className="text-[10px] text-muted-foreground/40 text-center">English Coach Pro v1.0</p>
      </div>
    </aside>
  )
}
