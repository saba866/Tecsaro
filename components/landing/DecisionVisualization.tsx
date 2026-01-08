
"use client"

import { useEffect, useRef } from "react"

export default function DecisionVisualization({
  ctaHovered,
}: {
  ctaHovered: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    /* ================= READ GLOBAL COLORS ================= */
    const styles = getComputedStyle(document.documentElement)

    const primaryDark = styles
      .getPropertyValue("--primary-dark")
      .trim()

    const accentTeal = styles
      .getPropertyValue("--accent-teal")
      .trim()

    const navyStroke = `rgba(${hexToRgb(primaryDark)}, 0.15)`
    const tealStroke = `rgba(${hexToRgb(accentTeal)}, 0.4)`

    const lines = Array.from({ length: 10 }).map((_, i) => ({
      y: 80 + i * 35,
    }))

    let frame: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = ctaHovered ? tealStroke : navyStroke

      lines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(0, line.y)
        ctx.lineTo(canvas.width * 0.75, canvas.height / 2)
        ctx.stroke()
      })

      frame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(frame)
  }, [ctaHovered])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

/* ================= HEX → RGB UTILITY ================= */
function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "")
  const bigint = parseInt(cleaned, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `${r}, ${g}, ${b}`
}
