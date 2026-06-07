import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'John Mark Dulce — WordPress Developer & SEO Specialist',
  description:
    'Personal AI-powered portfolio of John Mark Dulce — WordPress Developer, Graphic Designer, Social Media Manager, and SEO Specialist based in Davao City, PH.',
  openGraph: {
    title: 'John Mark Dulce — Portfolio',
    description: 'Chat with my AI avatar to learn about my work, skills, and services.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
