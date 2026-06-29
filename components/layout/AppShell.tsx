import { Sidebar } from "./Sidebar"
import { BottomNav } from "./BottomNav"
import { TopBar } from "./TopBar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col md:ml-60">
        <TopBar />
        <main className="flex-1 overflow-y-auto pt-24 pb-24 md:pt-0 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
