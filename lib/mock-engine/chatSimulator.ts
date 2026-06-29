import type { ConversationScenario, ConversationTurn } from "@/data/conversations"

export async function getNextAITurn(
  scenario: ConversationScenario,
  fromScriptIndex: number
): Promise<{ turn: ConversationTurn; scriptIndex: number } | null> {
  // Find next AI turn starting from fromScriptIndex
  const script = scenario.script
  let idx = fromScriptIndex
  while (idx < script.length) {
    if (script[idx].role === "ai") {
      const turn = script[idx]
      const delay = turn.delayMs ?? 1000
      await new Promise<void>((resolve) => setTimeout(resolve, delay))
      return { turn, scriptIndex: idx + 1 }
    }
    idx++
  }
  return null // script exhausted
}

export function peekNextUserTurn(
  scenario: ConversationScenario,
  fromScriptIndex: number
): ConversationTurn | null {
  const script = scenario.script
  for (let i = fromScriptIndex; i < script.length; i++) {
    if (script[i].role === "user") return script[i]
  }
  return null
}

export function isScriptComplete(
  scenario: ConversationScenario,
  scriptIndex: number
): boolean {
  return scriptIndex >= scenario.script.length
}
