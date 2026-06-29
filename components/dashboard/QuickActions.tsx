import Link from "next/link"
import {
  BookOpen, MessageCircle, Mic, Headphones,
  GraduationCap, Monitor,
} from "lucide-react"
import { cn } from "@/lib/utils"

const actions = [
  { icon: BookOpen, label: "Vocabulary", href: "/vocabulary", color: "text-blue-400", bg: "bg-blue-400/10" },
  { icon: MessageCircle, label: "Chat AI", href: "/conversations", color: "text-purple-400", bg: "bg-purple-400/10" },
  { icon: Mic, label: "Pronunciation", href: "/pronunciation", color: "text-rose-400", bg: "bg-rose-400/10" },
  { icon: Headphones, label: "Listening", href: "/listening", color: "text-amber-400", bg: "bg-amber-400/10" },
  { icon: GraduationCap, label: "Grammar", href: "/grammar", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { icon: Monitor, label: "IT English", href: "/it-english", color: "text-brand-400", bg: "bg-brand-400/10" },
]

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <p className="text-sm font-semibold text-foreground mb-3">Quick Access</p>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-150 hover:bg-white/5 active:scale-95"
          >
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", a.bg)}>
              <a.icon className={cn("h-5 w-5", a.color)} />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
