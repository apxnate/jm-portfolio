'use client'

import { useState } from 'react'
import { FacebookLogo, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react'

const LINKS = [
  {
    label: 'Facebook',
    icon: FacebookLogo,
    href: 'https://www.facebook.com/jmfdulce',
    hoverColor: '#1877F2',
    hoverBg: 'rgba(24, 119, 242, 0.1)',
    hoverBorder: 'rgba(24, 119, 242, 0.35)',
  },
  {
    label: 'Email',
    icon: EnvelopeSimple,
    href: 'mailto:jmdulce111@gmail.com',
    hoverColor: '#00d4ff',
    hoverBg: 'rgba(0, 212, 255, 0.08)',
    hoverBorder: 'rgba(0, 212, 255, 0.35)',
  },
  {
    label: 'WhatsApp',
    icon: WhatsappLogo,
    href: 'https://wa.me/639815866470',
    hoverColor: '#25D366',
    hoverBg: 'rgba(37, 211, 102, 0.1)',
    hoverBorder: 'rgba(37, 211, 102, 0.35)',
  },
]

function SocialLink({
  label, icon: Icon, href, hoverColor, hoverBg, hoverBorder,
}: typeof LINKS[number]) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 18px',
        borderRadius: 24,
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: 500,
        fontFamily: 'inherit',
        color: hovered ? hoverColor : 'var(--text-muted)',
        background: hovered ? hoverBg : 'transparent',
        border: `1px solid ${hovered ? hoverBorder : 'var(--border)'}`,
        transition: 'color 0.18s, background 0.18s, border-color 0.18s',
        whiteSpace: 'nowrap',
      }}
    >
      <Icon size={17} weight="bold" />
      {label}
    </a>
  )
}

export default function SocialLinks() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 14,
      }}
    >
      {LINKS.map((link) => (
        <SocialLink key={link.label} {...link} />
      ))}
    </div>
  )
}
