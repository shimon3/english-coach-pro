"use client"

import { useRef, useEffect, KeyboardEvent } from "react"
import { cn } from "@/lib/utils"
import { Send, Sparkles } from "lucide-react"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled: boolean
  suggestedReplies: string[]
  onSuggest: (text: string) => void
  placeholder?: string
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  suggestedReplies,
  onSuggest,
  placeholder = "Type your reply…",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 120) + "px"
  }, [value])

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && value.trim()) onSend()
    }
  }

  const canSend = !disabled && value.trim().length > 0

  return (
    <div className="border-t border-border/60 bg-background/95 backdrop-blur-sm">
      {/* Suggested replies */}
      {suggestedReplies.length > 0 && !disabled && (
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-1 mb-2 text-[10px] text-muted-foreground/50">
            <Sparkles className="h-3 w-3" />
            Suggest:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => onSuggest(reply)}
                className="rounded-xl bg-brand-500/10 border border-brand-500/20 px-3 py-2 text-xs text-brand-300 hover:bg-brand-500/20 hover:text-brand-200 transition-colors text-left leading-snug max-w-xs sm:max-w-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input row */}
      <div className="flex items-end gap-2 px-3 py-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder={disabled ? "Waiting for reply…" : placeholder}
          rows={1}
          className={cn(
            "flex-1 resize-none rounded-2xl border border-border/60 bg-card/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50 transition-all leading-relaxed",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ minHeight: "44px", maxHeight: "120px" }}
        />
        <button
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
          className={cn(
            "shrink-0 h-11 w-11 rounded-2xl flex items-center justify-center transition-all",
            canSend
              ? "bg-brand-500 hover:bg-brand-600 active:scale-95 shadow-lg shadow-brand-500/25"
              : "bg-white/5 border border-border/40 cursor-not-allowed"
          )}
        >
          <Send className={cn("h-4 w-4", canSend ? "text-white" : "text-muted-foreground/40")} />
        </button>
      </div>

      <p className="pb-2 text-center text-[10px] text-muted-foreground/30">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}
