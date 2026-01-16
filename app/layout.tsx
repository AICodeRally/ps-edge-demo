import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/src/context/ThemeContext'
import { BrandProvider } from '@/src/context/BrandContext'
import { SessionProvider } from '@/src/lib/auth/SessionProvider'

export const metadata: Metadata = {
  title: 'PS-Edge',
  description: 'Complete professional services platform for consulting firms. Manage clients, projects, team utilization, billing, and channel partnerships in one unified system.',
  keywords: ['professional services', 'consulting', 'project management', 'client management', 'channel partner portal'],
  authors: [{ name: 'Phoenix Philanthropy Group' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ps-edge-demo.vercel.app',
    siteName: 'PS-Edge',
    title: 'PS-Edge - Professional Services Platform',
    description: 'Complete professional services platform for consulting firms. Manage clients, projects, team utilization, billing, and channel partnerships.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PS-Edge - Professional Services Platform',
    description: 'Complete professional services platform for consulting firms. Manage clients, projects, team utilization, billing, and channel partnerships.',
  },
  metadataBase: new URL('https://ps-edge-demo.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProvider>
            <BrandProvider>
              {children}
            </BrandProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
