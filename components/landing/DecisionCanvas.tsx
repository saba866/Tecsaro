




"use client"

import { useEffect, useRef } from "react"

export default function DecisionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    /* ================= READ GLOBAL CSS TOKEN ================= */
    const styles = getComputedStyle(document.documentElement)
    const primaryDark = styles
      .getPropertyValue("--primary-dark")
      .trim()

    if (!primaryDark) return // hard stop if token missing

    /* ================= CANVAS SETUP ================= */
    let width = canvas.offsetWidth
    let height = canvas.offsetHeight

    canvas.width = width
    canvas.height = height

    const lines = Array.from({ length: 12 }).map((_, i) => ({
      x: Math.random() * width,
      y: height * 0.2 + i * 30,
      speed: 0.15 + Math.random() * 0.15,
    }))

    let animationFrame: number

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.strokeStyle = toRgba(primaryDark, 0.15)
      ctx.lineWidth = 1

      lines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(width * 0.8, height / 2)
        ctx.stroke()

        line.x += line.speed
        if (line.x > width) line.x = -50
      })

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  )
}

/* ================= UTIL ================= */
function toRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "")
  const bigint = parseInt(clean, 16)

  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
