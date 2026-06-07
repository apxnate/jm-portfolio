'use client'

import { motion } from 'motion/react'

const CHIPS = [
  { label: 'Show me your best projects', emoji: '🚀' },
  { label: 'What tools do you use?',     emoji: '🛠️' },
  { label: 'How can we collaborate?',    emoji: '🤝' },
  { label: 'Tell me about your SEO work', emoji: '📈' },
]

interface SuggestionChipsProps {
  onSelect: (text: string) => void
  disabled?: boolean
}

export default function SuggestionChips({ onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        width: '100%',
      }}
    >
      {CHIPS.map((chip, i) => (
        <motion.button
          key={chip.label}
          className="glass-chip"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.07, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.97 }}
          onClick={() => !disabled && onSelect(chip.label)}
          disabled={disabled}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 10,
            padding: '14px 14px 12px',
            borderRadius: 10,
            fontSize: '0.78rem',
            fontWeight: 500,
            cursor: disabled ? 'default' : 'pointer',
            fontFamily: 'inherit',
            textAlign: 'left',
            lineHeight: 1.35,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <span style={{ fontSize: '1.35rem', lineHeight: 1 }}>{chip.emoji}</span>
          <span>{chip.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
