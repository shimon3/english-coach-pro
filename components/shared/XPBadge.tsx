"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface XPBadgeProps {
  amount: number
  visible: boolean
  onAnimationEnd?: () => void
}

export function XPBadge({ amount, visible, onAnimationEnd }: XPBadgeProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      const t = setTimeout(() => {
        setShow(false)
        onAnimationEnd?.()
      }, 2200)
      return () => clearTimeout(t)
    }
  }, [visible, onAnimationEnd])

  if (!show) return null

  return (
    <div
      className={cn(
        "fixed top-1/3 left-1/2 -translate-x-1/2 z-50 pointer-events-none",
        "flex items-center gap-2 rounded-2xl border border-brand-400/30 bg-brand-900/90 backdrop-blur-sm",
        "px-6 py-3 shadow-2xl shadow-brand-500/20",
        "animate-bounce"
      )}
    >
      <span className="text-2xl">⚡</span>
      <span className="text-xl font-bold text-brand-300">+{amount} XP</span>
    </div>
  )
}
