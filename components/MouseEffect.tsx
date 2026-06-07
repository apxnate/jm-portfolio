'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from 'motion/react'

interface TrailPoint {
  x: number
  y: number
  hue: number
  age: number
  maxAge: number
}

interface Splash {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  hue: number
}

export default function MouseEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const splashesRef = useRef<Splash[]>([])
  const hueRef = useRef(0)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fadeRef = useRef(1)
  const rafRef = useRef<number>(0)
  const prefersReduced = useReducedMotion()

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReduced) return
    hueRef.current = (hueRef.current + 1.5) % 360
    trailRef.current.push({
      x: e.clientX,
      y: e.clientY,
      hue: hueRef.current,
      age: 0,
      maxAge: 38,
    })
    if (trailRef.current.length > 80) trailRef.current.shift()

    fadeRef.current = 1
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      fadeRef.current = 0
    }, 1800)
  }, [prefersReduced])

  const handleClick = useCallback((e: MouseEvent) => {
    if (prefersReduced) return
    for (let i = 0; i < 5; i++) {
      splashesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 40 + i * 25,
        opacity: 0.55 - i * 0.08,
        hue: (hueRef.current + i * 30) % 360,
      })
    }
  }, [prefersReduced])

  useEffect(() => {
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    let targetFade = 1

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      targetFade = fadeRef.current
      // Smooth fade toward target
      const globalAlpha = targetFade

      if (globalAlpha > 0.01) {
        ctx.save()
        ctx.globalAlpha = globalAlpha

        // Draw trail
        trailRef.current.forEach((pt, i) => {
          pt.age += 1
          const lifeRatio = 1 - pt.age / pt.maxAge
          if (lifeRatio <= 0) return

          const size = 4 * lifeRatio
          const alpha = lifeRatio * 0.7

          ctx.beginPath()
          ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${pt.hue}, 95%, 65%, ${alpha})`
          ctx.fill()
        })

        // Remove dead trail points
        trailRef.current = trailRef.current.filter((pt) => pt.age < pt.maxAge)

        // Connect trail with gradient lines
        if (trailRef.current.length > 2) {
          for (let i = 1; i < trailRef.current.length; i++) {
            const prev = trailRef.current[i - 1]
            const curr = trailRef.current[i]
            const lifeRatio = 1 - curr.age / curr.maxAge
            if (lifeRatio <= 0) continue

            const grad = ctx.createLinearGradient(prev.x, prev.y, curr.x, curr.y)
            grad.addColorStop(0, `hsla(${prev.hue}, 90%, 65%, ${lifeRatio * 0.3})`)
            grad.addColorStop(1, `hsla(${curr.hue}, 90%, 65%, ${lifeRatio * 0.3})`)

            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(curr.x, curr.y)
            ctx.strokeStyle = grad
            ctx.lineWidth = 2 * lifeRatio
            ctx.stroke()
          }
        }

        // Draw splashes
        splashesRef.current = splashesRef.current.filter((s) => s.opacity > 0.01)
        splashesRef.current.forEach((s) => {
          s.radius += (s.maxRadius - s.radius) * 0.15
          s.opacity *= 0.88

          ctx.beginPath()
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${s.hue}, 90%, 65%, ${s.opacity})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        })

        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [prefersReduced, handleMouseMove, handleClick])

  if (prefersReduced) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  )
}
