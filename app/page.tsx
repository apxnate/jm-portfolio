'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from 'ai/react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, Sun, Moon } from 'lucide-react'
import Avatar from '@/components/Avatar'
import ChatMessage from '@/components/ChatMessage'
import SuggestionChips from '@/components/SuggestionChips'
import MouseEffect from '@/components/MouseEffect'
import BackgroundGradient from '@/components/BackgroundGradient'
import SocialLinks from '@/components/SocialLinks'

type AvatarState = 'idle' | 'thinking' | 'speaking'

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, status, append } =
    useChat({ api: '/api/chat' })

  const hasMessages = messages.length > 0
  const isStreaming = (status as string) === 'streaming'

  const avatarState: AvatarState = isStreaming
    ? 'speaking'
    : isLoading
    ? 'thinking'
    : 'idle'

  /* auto-scroll on new message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  /* theme toggle */
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  /* chip → append message directly */
  const handleChipSelect = (text: string) => {
    append({ role: 'user', content: text })
  }

  /* Enter to submit */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) handleSubmit(e as unknown as React.FormEvent)
    }
  }

  /* auto-grow textarea */
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 140) + 'px'
  }

  const lastMsg = messages[messages.length - 1]
  const showChips = hasMessages && lastMsg?.role === 'assistant' && !isLoading

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100dvh' }}>
      <BackgroundGradient />
      <MouseEffect />

      {/* ── theme toggle ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{
          position: 'fixed', top: 16, right: 16, zIndex: 50,
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--surface)', border: '1px solid var(--border)',
          color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s',
        }}
        whileTap={{ scale: 0.88 }}
      >
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      </motion.button>

      {/* ══════════════════════════════════════════════
          LANDING STATE — centered hero
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {!hasMessages && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24, transition: { duration: 0.25 } }}
            style={{
              position: 'fixed', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              paddingBottom: 110,
              paddingLeft: 20, paddingRight: 20,
              gap: 0,
            }}
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: 24 }}
            >
              <Avatar state={avatarState} size={156} />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(1.9rem, 5vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.025em',
                textAlign: 'center',
                lineHeight: 1.15,
                marginBottom: 10,
              }}
            >
              Hey, I&apos;m John Mark 👋
            </motion.h1>

            {/* Accent role */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.4 }}
              style={{
                color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 500,
                textAlign: 'center', letterSpacing: '0.01em', marginBottom: 4,
              }}
            >
              WordPress Developer &amp; SEO Specialist
            </motion.p>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              style={{
                color: 'var(--text-muted)', fontSize: '0.8rem',
                textAlign: 'center', marginBottom: 32,
              }}
            >
              Davao City, PH · Available for remote work
            </motion.p>

            {/* Chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{ width: '100%', maxWidth: 520 }}
            >
              <SuggestionChips onSelect={handleChipSelect} disabled={isLoading} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          CHAT STATE — header + scrollable messages
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {hasMessages && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0,
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header strip */}
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg)',
                flexShrink: 0,
                backdropFilter: 'blur(12px)',
              }}
            >
              <Avatar state={avatarState} size={44} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.2 }}>
                  John Mark Dulce
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--accent)', lineHeight: 1.2 }}>
                  WordPress Developer &amp; SEO Specialist
                </p>
              </div>

              {/* Status dot */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: isLoading ? 'var(--accent)' : '#22c55e',
                    boxShadow: isLoading
                      ? '0 0 6px var(--accent)'
                      : '0 0 6px #22c55e',
                    animation: isLoading ? 'glow-pulse 1s ease-in-out infinite' : 'none',
                    display: 'block',
                  }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {isLoading ? 'Typing...' : 'Online'}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1, overflowY: 'auto',
                paddingBottom: 148,
              }}
            >
              <div
                style={{
                  maxWidth: 660, margin: '0 auto',
                  padding: '24px 24px',
                  display: 'flex', flexDirection: 'column', gap: 16,
                }}
              >
                {messages.map((msg, idx) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    isStreaming={
                      isStreaming &&
                      idx === messages.length - 1 &&
                      msg.role === 'assistant'
                    }
                  />
                ))}

                {/* Thinking indicator (submitted, not yet streaming) */}
                {isLoading && !isStreaming && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'flex' }}
                  >
                    <div
                      style={{
                        background: 'var(--ai-bubble)',
                        border: '1px solid var(--ai-border)',
                        borderRadius: '16px 16px 16px 4px',
                        padding: '12px 16px',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            style={{
                              display: 'block', width: 7, height: 7,
                              borderRadius: '50%', background: 'var(--accent)',
                              animation: `typing-dot 1.2s ease-in-out infinite`,
                              animationDelay: `${i * 0.2}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Chips after last AI message */}
                {showChips && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginTop: 4 }}
                  >
                    <SuggestionChips onSelect={handleChipSelect} disabled={isLoading} />
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          FIXED CHAT INPUT — always at bottom
      ══════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
          padding: '10px 16px 16px',
          background: `linear-gradient(to top, var(--bg) 72%, transparent)`,
        }}
      >
        <SocialLinks />

        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 660, margin: '0 auto' }}
        >
          <div
            className="chat-input-wrap"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 18,
              padding: '10px 10px 10px 16px',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleTextAreaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about my projects, skills, or how I can help…"
              rows={1}
              disabled={isLoading}
              style={{
                flex: 1, resize: 'none', background: 'transparent',
                border: 'none', outline: 'none', padding: 0,
                color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.5,
                maxHeight: 140, caretColor: 'var(--accent)',
                fontFamily: 'inherit',
              }}
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send"
              whileTap={input.trim() && !isLoading ? { scale: 0.9 } : {}}
              style={{
                flexShrink: 0,
                background: input.trim() && !isLoading ? 'var(--accent)' : 'var(--border)',
                color: input.trim() && !isLoading ? '#000' : 'var(--text-dim)',
                border: 'none', borderRadius: 12,
                padding: '8px 10px', cursor: 'pointer',
                opacity: !input.trim() || isLoading ? 0.45 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s, opacity 0.15s, color 0.15s',
              }}
            >
              <Send size={15} strokeWidth={2.5} />
            </motion.button>
          </div>

          <p
            style={{
              textAlign: 'center', marginTop: 5,
              fontSize: '0.68rem', color: 'var(--text-dim)',
            }}
          >
            Enter to send · Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  )
}
