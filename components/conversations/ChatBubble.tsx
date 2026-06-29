"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { LiveMessage } from "@/lib/hooks/useConversationChat"
import type { VocabHighlight } from "@/data/conversations"
import { ChevronDown, ChevronUp, Lightbulb, BookOpen } from "lucide-react"

interface ChatBubbleProps {
  message: LiveMessage
  aiName: string
  aiAvatar: string
}

// Render AI message content with clickable vocabulary words
function HighlightedContent({
  content,
  highlights,
}: {
  content: string
  highlights?: VocabHighlight[]
}) {
  const [activeWord, setActiveWord] = useState<VocabHighlight | null>(null)

  if (!highlights || highlights.length === 0) {
    return <p className="text-sm leading-relaxed">{content}</p>
  }

  // Build regex that matches any highlighted word (case-insensitive, whole word)
  const wordMap = new Map(highlights.map((h) => [h.word.toLowerCase(), h]))
  const pattern = highlights
    .map((h) => h.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")
  const regex = new RegExp(`\\b(${pattern})\\b`, "gi")

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index))
    }
    const word = match[0]
    const vocab = wordMap.get(word.toLowerCase())
    if (vocab) {
      parts.push(
        <button
          key={`${word}-${match.index}`}
          onClick={() => setActiveWord(activeWord?.word === vocab.word ? null : vocab)}
          className="underline decoration-brand-400/60 decoration-dotted underline-offset-2 text-brand-300 hover:text-brand-200 transition-colors cursor-pointer"
        >
          {word}
        </button>
      )
    } else {
      parts.push(word)
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex))
  }

  return (
    <div>
      <p className="text-sm leading-relaxed">{parts}</p>
      {activeWord && (
        <div className="mt-2 rounded-xl bg-brand-500/10 border border-brand-500/20 p-3 text-xs">
          <div className="flex items-start gap-2">
            <BookOpen className="h-3.5 w-3.5 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-brand-300">{activeWord.word}</span>
              {activeWord.phonetic && (
                <span className="ml-1.5 font-mono text-brand-400/70">{activeWord.phonetic}</span>
              )}
              <p className="text-muted-foreground mt-0.5 leading-relaxed">{activeWord.definition}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Grammar note collapsible card
function GrammarCard({ note }: { note: NonNullable<LiveMessage["grammarNote"]> }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-2 rounded-xl border border-amber-500/30 bg-amber-500/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-left"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs font-semibold text-amber-400">English Tip</span>
        </div>
        {open ? (
          <ChevronUp className="h-3.5 w-3.5 text-amber-400/60" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-amber-400/60" />
        )}
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2 text-xs">
          <div>
            <span className="text-muted-foreground/60">Phrase: </span>
            <span className="text-muted-foreground italic">&ldquo;{note.triggerPhrase}&rdquo;</span>
          </div>
          <div>
            <span className="text-muted-foreground/60">Correction: </span>
            <span className="text-emerald-400 font-medium">{note.correction}</span>
          </div>
          {note.betterAlternative && (
            <div>
              <span className="text-muted-foreground/60">Better alternative: </span>
              <span className="text-brand-300 font-medium">&ldquo;{note.betterAlternative}&rdquo;</span>
            </div>
          )}
          <p className="text-muted-foreground leading-relaxed">{note.explanation}</p>
        </div>
      )}
    </div>
  )
}

export function ChatBubble({ message, aiName, aiAvatar }: ChatBubbleProps) {
  const isUser = message.role === "user"

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-brand-500 px-4 py-3">
          <p className="text-sm text-white leading-relaxed">{message.content}</p>
        </div>
        {message.grammarNote && <GrammarCard note={message.grammarNote} />}
        <span className="text-[10px] text-muted-foreground/40 pr-1">
          <span suppressHydrationWarning>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </span>
      </div>
    )
  }

  // AI bubble
  return (
    <div className="flex items-end gap-2">
      <div className="shrink-0 h-8 w-8 rounded-full bg-brand-500/15 border border-brand-500/25 flex items-center justify-center">
        <span className="text-[10px] font-bold text-brand-300">{aiAvatar}</span>
      </div>
      <div className="max-w-[80%] flex flex-col gap-0.5">
        <span className="text-[10px] text-muted-foreground/60 ml-1">{aiName}</span>
        <div className="rounded-2xl rounded-bl-sm bg-card border border-border/60 px-4 py-3">
          <HighlightedContent
            content={message.content}
            highlights={message.vocabularyHighlights}
          />
        </div>
        <span className="text-[10px] text-muted-foreground/40 ml-1">
          <span suppressHydrationWarning>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </span>
      </div>
    </div>
  )
}
