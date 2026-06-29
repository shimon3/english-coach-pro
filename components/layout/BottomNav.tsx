"use client"

import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, MessageCircle, Mic, Headphones, GraduationCap, Monitor, User } from "lucide-react"
import { NavItem } from "./NavItem"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Vocabulary", href: "/vocabulary" },
  { icon: MessageCircle, label: "Chat", href: "/conversations" },
  { icon: Monitor, label: "IT English", href: "/it-english" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="border-t border-border/60 bg-card/95 backdrop-blur-md px-2 pb-safe">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <BottomNavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname.startsWith(item.href)}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

function BottomNavItem({
  icon: Icon,
  label,
  href,
  isActive,
}: {
  icon: typeof LayoutDashboard
  label: string
  href: string
  isActive: boolean
}) {
  return (
    <a
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-all duration-150",
        isActive ? "text-brand-400" : "text-muted-foreground"
      )}
    >
      <Icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]")} />
      <span className="text-[10px] font-medium">{label}</span>
    </a>
  )
}
