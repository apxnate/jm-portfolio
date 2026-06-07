'use client'

import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from 'ai'
import ProjectCards from './ProjectCards'

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: `typing-dot 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const rawContent = typeof message.content === 'string' ? message.content : ''

  const hasProjectsMarker = rawContent.includes('[SHOW_PROJECTS]')
  const cleanContent = rawContent.replace('[SHOW_PROJECTS]', '').trim()

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <div
          style={{
            maxWidth: '78%',
            background: 'var(--user-bubble)',
            border: '1px solid var(--user-border)',
            borderRadius: '16px 16px 4px 16px',
            padding: '10px 16px',
            color: 'var(--text)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}
        >
          {cleanContent}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', justifyContent: 'flex-start' }}
    >
      <div
        style={{
          maxWidth: '82%',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div
          style={{
            background: 'var(--ai-bubble)',
            border: '1px solid var(--ai-border)',
            borderRadius: '16px 16px 16px 4px',
            padding: '14px 16px',
          }}
        >
          {cleanContent === '' && isStreaming ? (
            <TypingIndicator />
          ) : (
            <div className="prose-chat" style={{ color: 'var(--text)' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanContent}</ReactMarkdown>
            </div>
          )}
        </div>

        {hasProjectsMarker && <ProjectCards />}
      </div>
    </motion.div>
  )
}
