'use client';

import Link from 'next/link';

/**
 * Footer Component
 *
 * Fixed bottom footer with:
 * - Gradient border top
 * - Department quick links
 * - Legal links
 * - AICR branding
 */

const departmentLinks = [
  { name: 'Sales', href: '/dashboard/sales' },
  { name: 'Delivery', href: '/dashboard/delivery' },
  { name: 'Client Success', href: '/dashboard/client-success' },
  { name: 'Finance', href: '/dashboard/finance' },
  { name: 'Operations', href: '/dashboard/operations' },
  { name: 'Partner', href: '/dashboard/partner-portal' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t-2 border-transparent">
      {/* Gradient Border */}
      <div
        className="h-0.5 w-full"
        style={{
          background: 'linear-gradient(90deg, var(--sparcc-gradient-start), var(--sparcc-gradient-mid1), var(--sparcc-gradient-mid2), var(--sparcc-gradient-end))',
        }}
      />

      <div className="px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
          {/* Department Quick Links */}
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {departmentLinks.map((link, index) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {link.name}
                </Link>
                {index < departmentLinks.length - 1 && (
                  <span className="mx-1 text-gray-300 dark:text-gray-600">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Branding & Legal */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Legal Links */}
            <div className="flex items-center gap-1">
              <span>&copy; {currentYear} PPG</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
                Privacy
              </Link>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
                Terms
              </Link>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
                Support
              </Link>
            </div>

            {/* AICR Branding */}
            <span className="text-gray-400 dark:text-gray-500">
              PS-Edge - Powered by AICR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
