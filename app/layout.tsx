import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/src/context/ThemeContext'

export const metadata: Metadata = {
  title: 'PS-Edge - Phoenix Philanthropy Group',
  description: 'Professional Services Edge for Phoenix Philanthropy Group - Consulting Business Operations & Channel Partner Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
