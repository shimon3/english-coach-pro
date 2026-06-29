"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { ConversationScenario, GrammarNote, VocabHighlight } from "@/data/conversations"
import { getNextAITurn, isScriptComplete } from "@/lib/mock-engine/chatSimulator"
import { useXPSync } from "@/lib/hooks/useXPSync"
import { incrementActivity } from "@/lib/hooks/useSkillActivity"
import { markScenarioComplete } from "@/lib/hooks/useCompletedItems"

export type ChatStatus = "idle" | "waiting" | "typing" | "complete"

export interface LiveMessage {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
  grammarNote?: GrammarNote
  vocabularyHighlights?: VocabHighlight[]
}

export interface SessionScores {
  grammarScore: number
  professionalScore: number
  vocabularyScore: number
  completionScore: number
}

export interface ConversationChatState {
  status: ChatStatus
  messages: LiveMessage[]
  currentSuggestedReplies: string[]
  grammarNotes: GrammarNote[]
  vocabLearned: VocabHighlight[]
  xpEarned: number
  showFeedback: boolean
  exchangeCount: number
}

let idCounter = 0
function nextId() { return `msg-${++idCounter}` }

export function useConversationChat(scenario: ConversationScenario) {
  const [state, setState] = useState<ConversationChatState>({
    status: "idle",
    messages: [],
    currentSuggestedReplies: [],
    grammarNotes: [],
    vocabLearned: [],
    xpEarned: 0,
    showFeedback: false,
    exchangeCount: 0,
  })

  const scriptCursorRef = useRef(0)
  const isMountedRef = useRef(true)
  // Guard against React StrictMode double-fire and re-entrancy
  const initializedRef = useRef(false)
  const pendingRef = useRef(false)

  const { addXP } = useXPSync()

  useEffect(() => {
    isMountedRef.current = true
    return () => { isMountedRef.current = false }
  }, [])

  const deliverAITurn = useCallback(async () => {
    if (!isMountedRef.current) return
    if (pendingRef.current) return
    pendingRef.current = true

    setState((prev) => ({ ...prev, status: "typing" }))

    const result = await getNextAITurn(scenario, scriptCursorRef.current)

    pendingRef.current = false
    if (!isMountedRef.current) return

    if (!result) {
      setState((prev) => ({ ...prev, status: "complete" }))
      return
    }

    const { turn, scriptIndex } = result
    scriptCursorRef.current = scriptIndex

    const aiMsg: LiveMessage = {
      id: nextId(),
      role: "ai",
      content: turn.content,
      timestamp: new Date(),
      grammarNote: turn.grammarNote,
      vocabularyHighlights: turn.vocabularyHighlights,
    }

    const newVocab = turn.vocabularyHighlights ?? []
    const newSuggestions = turn.suggestedReplies ?? []
    const complete = isScriptComplete(scenario, scriptCursorRef.current)

    // Track listening activity
    incrementActivity("aiTurnsReceived")
    if (complete) {
      incrementActivity("conversationsCompleted")
      markScenarioComplete(scenario.id, scenario.title, scenario.xpReward)
    }

    setState((prev) => ({
      ...prev,
      status: complete ? "complete" : "idle",
      messages: [...prev.messages, aiMsg],
      currentSuggestedReplies: newSuggestions,
      vocabLearned: [
        ...prev.vocabLearned,
        ...newVocab.filter(
          (v) => !prev.vocabLearned.some((existing) => existing.word === v.word)
        ),
      ],
    }))
  }, [scenario])

  // On mount: deliver the opening AI message — guarded against StrictMode double-fire
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    scriptCursorRef.current = 0
    deliverAITurn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id])

  // XP sync when conversation completes
  const xpSyncedRef = useRef(false)
  useEffect(() => {
    if (state.status === "complete" && !xpSyncedRef.current) {
      xpSyncedRef.current = true
      const finalXP = Math.min(
        scenario.xpReward,
        state.xpEarned + Math.round(scenario.xpReward * 0.3)
      )
      addXP(finalXP)
    }
  }, [state.status, state.xpEarned, scenario.xpReward, addXP])

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || state.status !== "idle") return

      const currentCursor = scriptCursorRef.current
      const scriptTurn = scenario.script[currentCursor]
      const grammarNote =
        scriptTurn?.role === "user" ? scriptTurn?.grammarNote : undefined

      if (scriptTurn?.role === "user") {
        scriptCursorRef.current = currentCursor + 1
      }

      const userMsg: LiveMessage = {
        id: nextId(),
        role: "user",
        content: text,
        timestamp: new Date(),
        grammarNote,
      }

      // Track speaking + writing activity
      incrementActivity("userTurnsSent")
      if (grammarNote) incrementActivity("grammarNotesEncountered")

      setState((prev) => ({
        ...prev,
        status: "waiting",
        messages: [...prev.messages, userMsg],
        currentSuggestedReplies: [],
        exchangeCount: prev.exchangeCount + 1,
        grammarNotes: grammarNote
          ? [...prev.grammarNotes, grammarNote]
          : prev.grammarNotes,
        xpEarned: prev.xpEarned + 15,
      }))

      setTimeout(() => {
        if (isMountedRef.current) deliverAITurn()
      }, 300)
    },
    [state.status, scenario.script, deliverAITurn]
  )

  const openFeedback = useCallback(() => {
    setState((prev) => ({ ...prev, showFeedback: true }))
  }, [])

  const closeFeedback = useCallback(() => {
    setState((prev) => ({ ...prev, showFeedback: false }))
  }, [])

  const restart = useCallback(() => {
    idCounter = 0
    scriptCursorRef.current = 0
    initializedRef.current = true  // prevent mount effect from re-firing
    xpSyncedRef.current = false
    pendingRef.current = false
    setState({
      status: "idle",
      messages: [],
      currentSuggestedReplies: [],
      grammarNotes: [],
      vocabLearned: [],
      xpEarned: 0,
      showFeedback: false,
      exchangeCount: 0,
    })
    setTimeout(() => {
      if (isMountedRef.current) deliverAITurn()
    }, 100)
  }, [deliverAITurn])

  const finalXP = Math.min(
    scenario.xpReward,
    state.xpEarned + (state.status === "complete" ? Math.round(scenario.xpReward * 0.3) : 0)
  )

  // Compute session scores
  const scriptLength = scenario.script.filter((t) => t.role === "user").length
  const progress = scriptLength > 0 ? Math.min(1, state.exchangeCount / scriptLength) : 0
  const scores: SessionScores = {
    grammarScore: Math.max(40, 100 - state.grammarNotes.length * 12),
    professionalScore: Math.round(progress * 100),
    vocabularyScore: Math.min(100, state.vocabLearned.length * 8),
    completionScore: state.status === "complete" ? 100 : Math.round(progress * 100),
  }

  return {
    ...state,
    finalXP,
    scores,
    scriptLength: scenario.script.length,
    sendMessage,
    openFeedback,
    closeFeedback,
    restart,
    isTyping: state.status === "typing" || state.status === "waiting",
    canSend: state.status === "idle",
  }
}
