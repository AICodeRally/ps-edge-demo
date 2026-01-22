'use client';

import Link from 'next/link';
import { SessionProvider } from '@/src/lib/auth/SessionProvider';
import { ThemeProvider } from '@/src/context/ThemeContext';

interface PublicLayoutProps {
  children: React.ReactNode;
}

/**
 * Public layout for landing page and marketing pages
 * Minimal chrome - just logo header, no navbar/footer
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <div className="min-h-screen" style={{ background: 'var(--color-surface-muted)' }}>
          {/* Simple header with logo */}
          <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #9333ea, #c026d3, #facc15)',
                  }}
                >
                  <span className="text-white font-bold text-lg">PS</span>
                </div>
                <span
                  className="text-3xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
                  }}
                >
                  EDGE
                </span>
              </Link>
              <Link
                href="/auth/signin"
                className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
                }}
              >
                Sign In
              </Link>
            </div>
          </header>

          {/* Page content */}
          {children}

          {/* Simple footer */}
          <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <span>Powered by </span>
            <span
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
              }}
            >
              AICR
            </span>
            <span className="mx-2">•</span>
            <span>An Edge Biz Ops Solution for Nonprofit Consulting</span>
          </footer>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}
