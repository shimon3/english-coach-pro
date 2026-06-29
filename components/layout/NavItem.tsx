"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface NavItemProps {
  icon: LucideIcon
  label: string
  href: string
  isActive: boolean
  collapsed?: boolean
  onClick?: () => void
}

export function NavItem({ icon: Icon, label, href, isActive, collapsed, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-brand-500/15 text-brand-300 shadow-sm"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 shrink-0 transition-colors",
          isActive ? "text-brand-400" : "text-current"
        )}
      />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  )
}
