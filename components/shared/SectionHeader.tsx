import { cn } from "@/lib/utils"
import Link from "next/link"

interface SectionHeaderProps {
  title: string
  action?: { label: string; href: string }
  className?: string
}

export function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {action && (
        <Link href={action.href} className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors">
          {action.label}
        </Link>
      )}
    </div>
  )
}
