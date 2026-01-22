'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Footer Component (NP-Edge - Nonprofit Modules Navigation)
 *
 * Simplified footer with nonprofit modules navigation
 */

const NONPROFIT_MODULES = [
  { name: 'Programs', path: '/dashboard/programs', color: '#22c55e' },
  { name: 'Fundraising', path: '/dashboard/fundraising', color: '#14b8a6' },
  { name: 'Volunteers', path: '/dashboard/volunteers', color: '#3b82f6' },
  { name: 'Beneficiaries', path: '/dashboard/beneficiaries', color: '#a855f7' },
  { name: 'Compliance', path: '/dashboard/compliance', color: '#6b7280' },
  { name: 'Events', path: '/dashboard/events', color: '#f97316' },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className="bg-white dark:bg-gray-900 shadow-sm border-t-4 border-transparent fixed bottom-0 left-0 right-0 z-40"
      style={{
        borderImage: 'linear-gradient(to right, #22c55e, #14b8a6) 1',
      }}
    >
      <div className="w-full px-6 py-4">
        <div className="text-center space-y-2">
          {/* Row 1: Nonprofit Modules Quick Links */}
          <div className="flex items-center justify-center gap-6 mb-2">
            {NONPROFIT_MODULES.map((module) => {
              const isActive = pathname === module.path;

              return (
                <Link
                  key={module.path}
                  href={module.path}
                  className={`text-base transition-all font-bold px-3 py-1 rounded ${
                    isActive
                      ? 'underline scale-110'
                      : 'hover:underline hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
                  style={{
                    color: module.color,
                    backgroundColor: isActive ? `${module.color}20` : 'transparent',
                  }}
                >
                  {module.name}
                </Link>
              );
            })}
          </div>

          {/* Row 2: Copyright + Legal */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <span>© 2026 Arizona Friends of Foster Children Foundation</span>
            <span>•</span>
            <Link href="/legal" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/legal" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Terms
            </Link>
          </div>

          {/* Row 3: Branding Tagline */}
          <div className="text-[10px] text-gray-400 dark:text-gray-600 tracking-widest uppercase">
            Enriching lives of Arizona foster children
          </div>
        </div>
      </div>
    </footer>
  );
}
