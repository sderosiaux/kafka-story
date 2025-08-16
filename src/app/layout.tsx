import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Apache Kafka: The Digital Nervous System',
  description: 'Understand the core architecture, what it really does, why it exists — and why every modern tech company relies on it.',
  keywords: ['kafka', 'apache kafka', 'streaming', 'real-time', 'architecture'],
  authors: [{ name: 'Kafka Story' }],
  openGraph: {
    title: 'Apache Kafka: The Digital Nervous System',
    description: 'Interactive deep dive into Apache Kafka architecture and ecosystem',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apache Kafka: The Digital Nervous System',
    description: 'Interactive deep dive into Apache Kafka architecture and ecosystem',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {children}
        </div>
      </body>
    </html>
  )
}