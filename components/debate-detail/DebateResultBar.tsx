"use client"

import { useEffect, useState } from "react"

type Props = {
  supportPct: number
  againstPct: number
  isFinalHour?: boolean
}

export default function DebateResultBar({
  supportPct,
  againstPct,
  isFinalHour = false,
}: Props) {
  const [supportWidth, setSupportWidth] = useState(0)
  const [againstWidth, setAgainstWidth] = useState(0)

  // 🔹 Smooth animated transition
  useEffect(() => {
    const t = setTimeout(() => {
      setSupportWidth(supportPct)
      setAgainstWidth(againstPct)
    }, 60)

    return () => clearTimeout(t)
  }, [supportPct, againstPct])

  return (
    <div
      className={`w-full h-3 rounded-full bg-powerbar overflow-hidden flex ${
        isFinalHour ? "animate-pulse" : ""
      }`}
    >
      <div
        className="h-full bg-support transition-all duration-700 ease-out"
        style={{ width: `${supportWidth}%` }}
      />
      <div
        className="h-full bg-against transition-all duration-700 ease-out"
        style={{ width: `${againstWidth}%` }}
      />
    </div>
  )
}
