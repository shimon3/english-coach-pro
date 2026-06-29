import { cn } from "@/lib/utils"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  action?: { label: string; href: string }
  className?: string
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/40 px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
        <span className="text-3xl">📚</span>
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-400 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
