'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Elov8 Comps',
    url: 'https://elov8comps.com',
    domain: 'elov8comps.com',
    type: 'Competition Platform / WooCommerce',
    description:
      'UK-based online competition platform built from scratch. Supports 100,000+ GBP worth of instant-win prize campaigns, WooCommerce ticket sales, and Mailchimp email campaigns.',
    tags: ['WordPress', 'WooCommerce', 'Mailchimp', 'Social Media'],
    highlights: ['Built from scratch', '100K+ GBP campaigns', 'Ticket sales', 'Email marketing'],
    accentColor: '#f59e0b',
  },
  {
    id: 2,
    title: 'Shaftesbury FC',
    url: 'https://shaftesburyfc.co.uk',
    domain: 'shaftesburyfc.co.uk',
    type: 'Football Club / Custom WooCommerce',
    description:
      'Football club website with custom-coded WooCommerce checkout fields. Conditional fields collect child details for Soccer School bookings. Matchday graphics and player announcements.',
    tags: ['WordPress', 'Custom Code', 'WooCommerce', 'Social Graphics'],
    highlights: ['Custom checkout fields', 'Conditional logic', 'Matchday content', 'WooCommerce'],
    accentColor: '#00d4ff',
  },
  {
    id: 3,
    title: 'Home Seal Solutions',
    url: 'https://homesealsolutions.co.uk',
    domain: 'homesealsolutions.co.uk',
    type: 'Roofing Website / Local SEO',
    description:
      'Local SEO campaign for a roofing and spray foam removal business in Dorset. Blog content, keyword-optimised pages, meta descriptions, and internal linking for Google visibility.',
    tags: ['SEO', 'Blog Content', 'Rank Math', 'Local SEO'],
    highlights: ['Dorset local SEO', 'Blog strategy', 'Meta optimised', 'Keyword targeting'],
    accentColor: '#4ade80',
  },
  {
    id: 4,
    title: 'Taste of Italian Wine',
    url: 'https://tasteofitalianwine.com',
    domain: 'tasteofitalianwine.com',
    type: 'Multilingual eCommerce',
    description:
      'Multilingual wine eCommerce website supporting Albanian, UK English, and Italian customers. Integrated automatic translation and currency conversion for an international shopping experience.',
    tags: ['WordPress', 'eCommerce', 'Multilingual', 'Currency'],
    highlights: ['3 languages', 'Auto translation', 'Currency conversion', 'International UX'],
    accentColor: '#c084fc',
  },
  {
    id: 5,
    title: 'La Casa Di Roxy',
    url: 'https://lacasadiroxy.co.uk',
    domain: 'lacasadiroxy.co.uk',
    type: 'Restaurant Rebrand / Social Media',
    description:
      'Italian restaurant rebrand in Bournemouth. Rebrand announcement content, social media graphics, hidden alfresco garden promotion, and brand consistency across Facebook and Instagram.',
    tags: ['Social Media', 'Graphic Design', 'Canva', 'Brand Identity'],
    highlights: ['Full rebrand', 'Facebook + Instagram', 'Food content', 'Garden promotion'],
    accentColor: '#f472b6',
  },
  {
    id: 6,
    title: 'The Hamworthy Club',
    url: 'https://canfordmagnabookings.co.uk',
    domain: 'canfordmagnabookings.co.uk',
    type: 'Venue / Events / Booking',
    description:
      'Community venue covering carvery, live music, private functions, and seasonal events. Supported the Amelia booking system, created event graphics, and planned custom event card layouts.',
    tags: ['WordPress', 'Amelia Booking', 'Event Graphics', 'Social Media'],
    highlights: ['Booking system', 'Event graphics', 'Content strategy', 'Community venue'],
    accentColor: '#fb923c',
  },
]

export default function ProjectCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', marginTop: 8, marginBottom: 4 }}
    >
      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: 12,
        }}
      >
        Selected Work
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="project-card"
            style={{
              display: 'block',
              textDecoration: 'none',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {/* Favicon / logo area */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 130,
                background: `linear-gradient(135deg,
                  color-mix(in srgb, ${project.accentColor} 14%, var(--bg)) 0%,
                  color-mix(in srgb, ${project.accentColor} 5%, var(--bg)) 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              {/* Logo / favicon */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid color-mix(in srgb, ${project.accentColor} 25%, transparent)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 20px color-mix(in srgb, ${project.accentColor} 20%, transparent)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://www.google.com/s2/favicons?domain=${project.domain}&sz=128`}
                  alt={`${project.title} logo`}
                  style={{ width: 40, height: 40, objectFit: 'contain' }}
                  onError={(e) => {
                    const el = e.currentTarget
                    el.style.display = 'none'
                  }}
                />
              </div>

              {/* Domain label */}
              <span
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-dim)',
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  letterSpacing: '0.02em',
                }}
              >
                {project.domain}
              </span>

              {/* Arrow link indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowUpRight size={13} style={{ color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '12px 14px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <h3 style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.3 }}>
                  {project.title}
                </h3>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    color: project.accentColor,
                    background: `color-mix(in srgb, ${project.accentColor} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${project.accentColor} 22%, transparent)`,
                    borderRadius: 4,
                    padding: '2px 6px',
                    whiteSpace: 'nowrap',
                    marginLeft: 8,
                  }}
                >
                  {project.type.split(' / ')[0]}
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: 10 }}>
                {project.description}
              </p>

              {/* Highlights */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      borderRadius: 20,
                      padding: '3px 8px',
                      background: `color-mix(in srgb, ${project.accentColor} 12%, transparent)`,
                      color: project.accentColor,
                      border: `1px solid color-mix(in srgb, ${project.accentColor} 28%, transparent)`,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.68rem',
                      borderRadius: 4,
                      padding: '2px 6px',
                      background: 'var(--bg2)',
                      color: 'var(--text-dim)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ fontSize: '0.72rem', marginTop: 12, textAlign: 'center', color: 'var(--text-dim)' }}
      >
        Want details on any of these? Just ask! 😊
      </motion.p>
    </motion.div>
  )
}
