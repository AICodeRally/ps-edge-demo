'use client';

import Link from 'next/link';

/**
 * Footer Component (SGM Pattern)
 *
 * Fixed bottom footer with:
 * - AI orbs (OpsChief + AskPS)
 * - Department quick links
 * - Legal links
 * - Edge Biz Ops branding
 */

const departmentLinks = [
  { name: 'Sales', href: '/dashboard/sales' },
  { name: 'Marketing', href: '/dashboard/marketing' },
  { name: 'Services', href: '/dashboard/delivery' },
  { name: 'Operations', href: '/dashboard/operations' },
];

/**
 * Mini AI Orb Component for footer
 */
function MiniOrb({ variant }: { variant: 'opschief' | 'askps' }) {
  const gradients = {
    opschief: 'linear-gradient(135deg, #6b21a8, #9333ea, #a855f7)',
    askps: 'linear-gradient(135deg, #a855f7, #c084fc, #d8b4fe)',
  };

  return (
    <div
      className="w-6 h-6 rounded-full animate-pulse cursor-pointer hover:scale-110 transition-transform"
      style={{
        background: gradients[variant],
        boxShadow: '0 0 8px rgba(147, 51, 234, 0.4)',
      }}
      title={variant === 'opschief' ? 'OpsChief AI' : 'AskPS Assistant'}
    />
  );
}

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Gradient Border */}
      <div
        className="h-0.5 w-full"
        style={{
          background: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
        }}
      />

      <div className="px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          {/* Left: AI Orbs */}
          <div className="flex items-center gap-2">
            <MiniOrb variant="opschief" />
            <MiniOrb variant="askps" />
          </div>

          {/* Center: Department Links */}
          <div className="flex items-center gap-1">
            {departmentLinks.map((link, index) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {link.name}
                </Link>
                {index < departmentLinks.length - 1 && (
                  <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Right: Legal & Branding */}
          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
            <span>© 2026 BHG Consulting</span>
            <span className="mx-1">•</span>
            <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
              Privacy
            </Link>
            <span className="mx-1">•</span>
            <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
              Terms
            </Link>
            <span className="mx-1">•</span>
            <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
              Support
            </Link>
          </div>
        </div>

        {/* Bottom Row: Branding */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-1">
          An Edge Biz Ops Solution • Powered by AICR
        </div>
      </div>
    </footer>
  );
}
