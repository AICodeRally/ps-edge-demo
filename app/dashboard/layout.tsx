import { Navbar } from '@/src/components/layout/Navbar'
import { Footer } from '@/src/components/layout/Footer'

/**
 * Dashboard Layout (SGM Pattern)
 *
 * Architecture:
 * - Sticky navbar at top (z-50)
 * - Main content area with bottom padding for footer clearance
 * - Fixed footer at bottom (z-40) with 6 P's navigation
 *
 * No sidebar - mobile-first design with footer-based navigation.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
      <Navbar />
      <main className="flex-1 pb-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}
