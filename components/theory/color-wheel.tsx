"use client"

import { useRef, useEffect } from "react"

export function ColorWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = ((angle - 2) * Math.PI) / 180
      const endAngle = ((angle + 2) * Math.PI) / 180

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Convert HSL to RGB for the current angle
      const hue = angle
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
      ctx.fill()
    }

    // Draw white center
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()

    // Draw black border
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 1
    ctx.stroke()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="rounded-full shadow-md"
      aria-label="Interactive color wheel"
    />
  )
}
