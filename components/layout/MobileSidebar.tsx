"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, BookOpen, MessageCircle, Mic,
  Headphones, GraduationCap, Monitor, User, Zap, Globe, X,
} from "lucide-react"
import { NavItem } from "./NavItem"
import { useTrack } from "@/lib/track-context"
import { cn } from "@/lib/utils"

const generalNavItems = [
  { icon: BookOpen,      label: "Vocabulary",   href: "/vocabulary" },
  { icon: MessageCircle, label: "Conversations", href: "/conversations" },
  { icon: GraduationCap, label: "Grammar",       href: "/grammar" },
  { icon: Mic,           label: "Pronunciation", href: "/pronunciation" },
  { icon: Headphones,    label: "Listening",     href: "/listening" },
]

const itNavItems = [
  { icon: BookOpen,      label: "Vocabulary",   href: "/vocabulary" },
  { icon: MessageCircle, label: "Conversations", href: "/conversations" },
  { icon: GraduationCap, label: "Grammar",       href: "/grammar" },
]

interface MobileSidebarProps {
  open: boolean
  onClose: () => void
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname()
  const { track, setTrack } = useTrack()

  useEffect(() => {
    onClose()
  }, [pathname])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-72 flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-sidebar-border/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-lg shadow-brand-500/30">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">English Coach</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Pro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-white/5"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          <NavItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/dashboard"
            isActive={pathname.startsWith("/dashboard")}
          />

          <div>
            <div className="flex items-center gap-1.5 px-3 mb-1.5">
              <Globe className="h-3 w-3 text-sky-400/80" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400/80">
                General English
              </p>
            </div>
            <div className="space-y-0.5">
              {generalNavItems.map((item) => (
                <NavItem
                  key={`general-${item.href}`}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={pathname.startsWith(item.href) && track === "general"}
                  onClick={() => setTrack("general")}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 px-3 mb-1.5">
              <Monitor className="h-3 w-3 text-emerald-400/80" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/80">
                IT English
              </p>
            </div>
            <div className="space-y-0.5">
              {itNavItems.map((item) => (
                <NavItem
                  key={`it-${item.href}`}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={pathname.startsWith(item.href) && track === "it"}
                  onClick={() => setTrack("it")}
                />
              ))}
            </div>
          </div>

          <NavItem
            icon={User}
            label="Profile"
            href="/profile"
            isActive={pathname.startsWith("/profile")}
          />
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-sidebar-border/50">
          <p className="text-[10px] text-muted-foreground/40 text-center">English Coach Pro v1.0</p>
        </div>
      </aside>
    </>
  )
}
