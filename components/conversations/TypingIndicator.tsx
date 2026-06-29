import { cn } from "@/lib/utils"

interface TypingIndicatorProps {
  aiName: string
  aiAvatar: string
  className?: string
}

export function TypingIndicator({ aiName, aiAvatar, className }: TypingIndicatorProps) {
  return (
    <div className={cn("flex items-end gap-2", className)}>
      {/* Avatar */}
      <div className="shrink-0 h-8 w-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
        <span className="text-[10px] font-bold text-brand-300">{aiAvatar}</span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-muted-foreground/60 ml-1">{aiName}</span>
        <div className="rounded-2xl rounded-bl-sm bg-card border border-border/60 px-4 py-3 flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "1s" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
            style={{ animationDelay: "150ms", animationDuration: "1s" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
            style={{ animationDelay: "300ms", animationDuration: "1s" }}
          />
        </div>
      </div>
    </div>
  )
}
