'use client'

import { useReducedMotion } from 'motion/react'

const BLOBS = [
  // Cyan — upper-left anchor
  {
    size: 750,
    pos: { top: '-18%', left: '-10%' },
    blur: 80,
    color: 'var(--blob-cyan)',
    anim: 'wave1 22s ease-in-out infinite',
  },
  // Indigo — upper-right anchor
  {
    size: 640,
    pos: { top: '-12%', right: '-8%' },
    blur: 90,
    color: 'var(--blob-indigo)',
    anim: 'wave2 28s ease-in-out infinite 3s',
  },
  // Teal — mid-left
  {
    size: 540,
    pos: { top: '30%', left: '5%' },
    blur: 75,
    color: 'var(--blob-teal)',
    anim: 'wave3 19s ease-in-out infinite 6s',
  },
  // Purple — lower-right
  {
    size: 600,
    pos: { bottom: '-14%', right: '4%' },
    blur: 100,
    color: 'var(--blob-purple)',
    anim: 'wave4 24s ease-in-out infinite 1s',
  },
  // Cyan soft — bottom-center (fills the middle)
  {
    size: 480,
    pos: { bottom: '8%', left: '28%' },
    blur: 120,
    color: 'var(--blob-cyan)',
    anim: 'wave2 32s ease-in-out infinite 12s',
  },
]

export default function BackgroundGradient() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 68%)`,
            filter: `blur(${blob.blur}px)`,
            animation: reduced ? 'none' : blob.anim,
            willChange: 'transform',
            ...blob.pos,
          }}
        />
      ))}
    </div>
  )
}
