"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { getScenarioById } from "@/data/conversations"
import { useConversationChat } from "@/lib/hooks/useConversationChat"
import { ChatBubble } from "@/components/conversations/ChatBubble"
import { ChatInput } from "@/components/conversations/ChatInput"
import { TypingIndicator } from "@/components/conversations/TypingIndicator"
import { FeedbackDrawer } from "@/components/conversations/FeedbackDrawer"
import { CATEGORY_META } from "@/data/conversations"
import { LevelBadge } from "@/components/shared/LevelBadge"
import { cn } from "@/lib/utils"
import { ChevronLeft, X, Info, ChevronDown, Zap, MessageSquare } from "lucide-react"

export default function ConversationSessionPage() {
  const params = useParams()
  const router = useRouter()
  const scenarioId = params.scenarioId as string
  const scenario = getScenarioById(scenarioId)

  const [inputValue, setInputValue] = useState("")
  const [contextOpen, setContextOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Redirect if not found
  if (!scenario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 text-center">
        <div className="h-16 w-16 rounded-2xl bg-white/5 border border-border/30 flex items-center justify-center">
          <MessageSquare className="h-7 w-7 text-muted-foreground/40" />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">Scenario not found</p>
          <p className="text-sm text-muted-foreground mt-1">The scenario you're looking for doesn't exist.</p>
        </div>
        <button
          onClick={() => router.push("/conversations")}
          className="rounded-xl bg-brand-500/10 border border-brand-500/20 px-4 py-2 text-sm font-medium text-brand-300 hover:bg-brand-500/20 transition-colors"
        >
          Browse scenarios
        </button>
      </div>
    )
  }

  return <SessionView scenarioId={scenarioId} />
}

function SessionView({ scenarioId }: { scenarioId: string }) {
  const router = useRouter()
  const scenario = getScenarioById(scenarioId)!
  const catMeta = CATEGORY_META[scenario.category]

  const {
    messages,
    status,
    currentSuggestedReplies,
    grammarNotes,
    vocabLearned,
    exchangeCount,
    showFeedback,
    finalXP,
    scores,
    scriptLength,
    isTyping,
    canSend,
    sendMessage,
    openFeedback,
    closeFeedback,
    restart,
  } = useConversationChat(scenario)

  const [inputValue, setInputValue] = useState("")
  const [contextOpen, setContextOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Close context after first exchange
  useEffect(() => {
    if (exchangeCount >= 1) setContextOpen(false)
  }, [exchangeCount])

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || !canSend) return
    sendMessage(inputValue.trim())
    setInputValue("")
  }, [inputValue, canSend, sendMessage])

  const handleSuggest = useCallback((text: string) => {
    setInputValue(text)
    sendMessage(text)
    setInputValue("")
  }, [sendMessage])

  const progress = Math.min(100, Math.round((messages.length / scenario.script.length) * 100))
  const isComplete = status === "complete"

  return (
    <div className="flex flex-col h-screen">
      {/* ── Fixed Header ─────────────────────────────────────────── */}
      <div className="shrink-0 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => router.push("/conversations")}
            className="rounded-xl p-1.5 hover:bg-white/5 transition-colors"
            aria-label="Back to scenarios"
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded", catMeta.bg, catMeta.color)}>
                {catMeta.label}
              </span>
              <LevelBadge level={scenario.difficulty} size="xs" />
            </div>
            <p className="text-sm font-semibold text-foreground leading-tight truncate mt-0.5">
              {scenario.title}
            </p>
          </div>

          {/* XP badge */}
          <div className="flex items-center gap-1 text-xs font-semibold text-brand-400">
            <Zap className="h-3.5 w-3.5" />
            {finalXP}
          </div>

          <button
            onClick={openFeedback}
            className="rounded-xl border border-border/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            Summary
          </button>
        </div>

        {/* Progress bar */}
        <div className="mx-4 mb-3 h-1 rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── Scrollable chat area ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Context banner */}
        <div className="rounded-2xl border border-border/40 bg-card/60 overflow-hidden">
          <button
            onClick={() => setContextOpen(!contextOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-brand-400" />
              <span className="text-sm font-semibold text-foreground">Scenario</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground/60 transition-transform", contextOpen ? "rotate-180" : "")} />
          </button>
          {contextOpen && (
            <div className="px-4 pb-4 space-y-2 text-xs text-muted-foreground border-t border-border/30 pt-3">
              <p className="leading-relaxed">{scenario.context}</p>
              <div className="flex gap-4 mt-2">
                <div>
                  <span className="font-semibold text-foreground">Your role: </span>
                  {scenario.userRole}
                </div>
                <div>
                  <span className="font-semibold text-foreground">AI plays: </span>
                  {scenario.aiName} ({scenario.aiRole})
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            aiName={scenario.aiName}
            aiAvatar={scenario.aiAvatar}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <TypingIndicator
            aiName={scenario.aiName}
            aiAvatar={scenario.aiAvatar}
          />
        )}

        {/* Session complete banner */}
        {isComplete && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
            <p className="text-sm font-semibold text-emerald-400 mb-1">Conversation complete!</p>
            <p className="text-xs text-muted-foreground mb-3">
              You earned <span className="font-bold text-brand-300">+{finalXP} XP</span> for completing this scenario.
            </p>
            <button
              onClick={openFeedback}
              className="rounded-xl bg-brand-500 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
            >
              View Summary
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Fixed Input ───────────────────────────────────────────── */}
      {!isComplete && (
        <div className="shrink-0 pb-16 md:pb-0">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            disabled={!canSend}
            suggestedReplies={currentSuggestedReplies}
            onSuggest={handleSuggest}
          />
        </div>
      )}

      {/* ── Feedback Drawer ───────────────────────────────────────── */}
      {showFeedback && (
        <FeedbackDrawer
          scenarioTitle={scenario.title}
          xpEarned={finalXP}
          grammarNotes={grammarNotes}
          vocabLearned={vocabLearned}
          exchangeCount={exchangeCount}
          isComplete={isComplete}
          scores={scores}
          onClose={closeFeedback}
          onRestart={() => {
            restart()
            closeFeedback()
          }}
        />
      )}
    </div>
  )
}
