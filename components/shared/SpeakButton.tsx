"use client"

import { useSpeech } from "@/lib/hooks/useSpeech"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpeakButtonProps {
  text: string
  className?: string
  label?: string
}

export function SpeakButton({ text, className, label = "Listen" }: SpeakButtonProps) {
  const { speak, stop, isSpeaking, isSupported } = useSpeech()

  if (!isSupported) return null

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isSpeaking) {
      stop()
    } else {
      speak(text)
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isSpeaking ? "Stop" : label}
      title={isSpeaking ? "Stop" : label}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors",
        isSpeaking
          ? "text-brand-300 bg-brand-500/10 hover:bg-brand-500/20"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5",
        className
      )}
    >
      {isSpeaking ? (
        <VolumeX className="h-3.5 w-3.5" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
      {isSpeaking ? "Stop" : label}
    </button>
  )
}
