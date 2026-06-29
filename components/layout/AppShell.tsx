"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"
import { BottomNav } from "./BottomNav"
import { TopBar } from "./TopBar"
import { MobileSidebar } from "./MobileSidebar"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const isConversationSession = pathname.startsWith("/conversations/") && pathname.split("/").length > 2

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <MobileSidebar open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div className="flex flex-1 flex-col md:ml-60">
        <TopBar onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className={
          isConversationSession
            ? "flex-1 overflow-y-auto overflow-x-hidden md:pt-0 md:pb-0"
            : "flex-1 overflow-y-auto overflow-x-hidden pt-16 pb-24 md:pt-0 md:pb-0"
        }>
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
