"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Track = "general" | "it"

interface TrackContextValue {
  track: Track
  setTrack: (t: Track) => void
}

const TrackContext = createContext<TrackContextValue>({
  track: "general",
  setTrack: () => {},
})

export function TrackProvider({ children }: { children: ReactNode }) {
  const [track, setTrackState] = useState<Track>("general")

  useEffect(() => {
    const saved = localStorage.getItem("ec-track") as Track | null
    if (saved === "it" || saved === "general") setTrackState(saved)
  }, [])

  const setTrack = (t: Track) => {
    setTrackState(t)
    localStorage.setItem("ec-track", t)
  }

  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  )
}

export function useTrack() {
  return useContext(TrackContext)
}
