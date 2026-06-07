'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const TOTAL = 192
const DEFAULT_FRAME = 191

// Center-square crop from 1280×720 source frames
const SRC_X = 280
const SRC_Y = 0
const SRC_DIM = 720

type AvatarState = 'idle' | 'thinking' | 'speaking'

interface AvatarProps {
  state?: AvatarState
  size?: number
}

export default function Avatar({ state = 'idle', size = 140 }: AvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const loadedCount = useRef(0)
  const currentFrame = useRef<number>(DEFAULT_FRAME)
  const targetFrame = useRef<number>(DEFAULT_FRAME)
  const rafId = useRef<number>()
  const sizeRef = useRef(size)
  const [allReady, setAllReady] = useState(false)
  const reduced = useReducedMotion()

  // Keep sizeRef current without restarting the render loop
  useEffect(() => { sizeRef.current = size }, [size])

  // ── 1. Preload all frames; show fallback <img> until done ──
  useEffect(() => {
    const imgs: HTMLImageElement[] = []

    for (let i = 0; i < TOTAL; i++) {
      const img = new Image()
      img.onload = () => {
        loadedCount.current++
        if (loadedCount.current === TOTAL) setAllReady(true)
      }
      img.src = `/avatar-frames/frame_${String(i).padStart(5, '0')}.webp`
      imgs.push(img)
    }

    framesRef.current = imgs
  }, [])

  // ── 2. Mouse / touch → target frame (idle state only) ──
  useEffect(() => {
    if (state !== 'idle' || reduced) return

    const onMove = (clientX: number) => {
      const ratio = Math.max(0, Math.min(1, clientX / window.innerWidth))
      targetFrame.current = Math.round(ratio * (TOTAL - 1))
    }

    const onMouse = (e: MouseEvent) => onMove(e.clientX)
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) onMove(e.touches[0].clientX) }

    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [state, reduced])

  // ── 3. State-driven overrides (thinking / speaking → oscillate) ──
  useEffect(() => {
    if (state === 'idle') return

    let t = 0
    const isThinking = state === 'thinking'
    const speed = isThinking ? 0.035 : 0.13
    const range = isThinking ? 9 : 17

    const id = setInterval(() => {
      t += speed
      targetFrame.current = Math.max(
        0,
        Math.min(TOTAL - 1, Math.round(DEFAULT_FRAME + Math.sin(t) * range))
      )
    }, 30)

    return () => clearInterval(id)
  }, [state])

  // ── 4. Canvas render loop ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastIdx = -1

    const draw = () => {
      const s = sizeRef.current
      const dpr = window.devicePixelRatio || 1
      const px = Math.round(s * dpr)

      if (canvas.width !== px || canvas.height !== px) {
        canvas.width = px
        canvas.height = px
      }

      // Smooth lerp toward target frame
      const speed = reduced ? 1 : 0.14
      currentFrame.current += (targetFrame.current - currentFrame.current) * speed

      const idx = Math.max(0, Math.min(TOTAL - 1, Math.round(currentFrame.current)))

      if (idx !== lastIdx) {
        const img = framesRef.current[idx]
        if (img?.complete && img.naturalWidth > 0) {
          ctx.clearRect(0, 0, px, px)
          ctx.drawImage(img, SRC_X, SRC_Y, SRC_DIM, SRC_DIM, 0, 0, px, px)
          lastIdx = idx
        }
      }

      rafId.current = requestAnimationFrame(draw)
    }

    rafId.current = requestAnimationFrame(draw)
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current) }
  }, [reduced])

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {/* Animated cyan glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '1.5px solid var(--accent-border)',
          boxShadow: '0 0 18px var(--accent-glow)',
          animation: 'ring-pulse 2.5s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Static fallback (frame_00191) shown while canvas frames load */}
      {!allReady && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/avatar-frames/frame_00191.webp"
          alt="John Mark Dulce"
          loading="eager"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center 5%',
          }}
        />
      )}

      {/* Canvas: active once all frames are loaded */}
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          display: allReady ? 'block' : 'none',
        }}
      />
    </div>
  )
}
