"use client"

import { useEffect, useState } from "react"

export function useSmoothValue(value: number, delay = 120) {
  const [smoothValue, setSmoothValue] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => {
      setSmoothValue(value)
    }, delay)

    return () => clearTimeout(t)
  }, [value, delay])

  return smoothValue
}
