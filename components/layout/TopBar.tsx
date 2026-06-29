"use client"

import { usePathname } from "next/navigation"
import { Zap, Bell } from "lucide-react"
import { currentUser } from "@/data/user"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const pageTitles: Record<string, string> = {
  "/dashboard":    "Dashboard",
  "/vocabulary":   "Vocabulary",
  "/conversations":"AI Conversations",
  "/pronunciation":"Pronunciation",
  "/listening":    "Listening",
  "/grammar":      "Grammar",
  "/profile":      "Profile",
}

export function TopBar() {
  const pathname = usePathname()
  const segment = "/" + (pathname.split("/")[1] ?? "")
  const title = pageTitles[segment] ?? "English Coach Pro"

  // The conversation session has its own full header — hide TopBar there
  const isConversationSession = pathname.startsWith("/conversations/") && pathname.split("/").length > 2

  if (isConversationSession) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-40 md:hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-card/95 backdrop-blur-md border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
            <Zap className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-white/5">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
          </button>
          <Avatar className="h-8 w-8 border border-brand-500/40">
            <AvatarFallback className="bg-brand-500/20 text-brand-300 text-xs font-semibold">
              {currentUser.avatarInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
