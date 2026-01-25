'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIX_PS_DEFINITIONS, type SixPCategory } from '@/types/ps-edge/six-ps.types';
import { getSixPsOrder } from '@/lib/config/sixps-order';

/**
 * Footer Component (SGM Pattern with 6 P's Navigation)
 *
 * 3 centered rows:
 * - Row 1: AI orbs (3 left, 2 right) + 6 P's navigation links
 * - Row 2: Copyright + legal links
 * - Row 3: Branding tagline
 */


export function Footer() {
  const pathname = usePathname();
  const [sixPsOrder, setSixPsOrder] = useState<SixPCategory[]>(getSixPsOrder());

  // Listen for order changes from settings
  useEffect(() => {
    const handleOrderChange = () => {
      setSixPsOrder(getSixPsOrder());
    };

    window.addEventListener('sixps-order-changed', handleOrderChange);
    return () => window.removeEventListener('sixps-order-changed', handleOrderChange);
  }, []);

  // Determine active P from pathname
  const getActiveSixP = (): SixPCategory | null => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length < 2) return null;

    const pSegment = pathSegments[1]; // /dashboard/[p]/...
    const pMap: Record<string, SixPCategory> = {
      'people': 'PEOPLE',
      'process': 'PROCESS',
      'practice': 'PRACTICE',
      'performance': 'PERFORMANCE',
      'pipeline': 'PIPELINE',
      'purpose': 'PURPOSE',
    };

    return pMap[pSegment] || null;
  };

  const activeSixP = getActiveSixP();

  return (
    <footer
      className="bg-white dark:bg-gray-900 shadow-sm border-t-4 border-transparent fixed bottom-0 left-0 right-0 z-40"
      style={{
        borderImage: 'linear-gradient(to right, #9333ea, #c026d3, #db2777, #facc15) 1',
      }}
    >
      <div className="w-full px-6 py-4">
        <div className="text-center space-y-2">
          {/* Row 1: 6 P's Quick Links */}
          <div className="flex items-center justify-center gap-6 mb-2">
            {sixPsOrder.map((pCategory) => {
              const pConfig = SIX_PS_DEFINITIONS[pCategory];
              const isActive = activeSixP === pCategory;
              const pSlug = pCategory.toLowerCase();

              return (
                <Link
                  key={pCategory}
                  href={`/dashboard/${pSlug}`}
                  className={`text-base transition-all font-bold px-3 py-1 rounded ${
                    isActive
                      ? 'underline scale-110'
                      : 'hover:underline hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
                  style={{
                    color: pConfig.colorHex,
                    backgroundColor: isActive ? `${pConfig.colorHex}20` : 'transparent',
                  }}
                  title={pConfig.description}
                >
                  {pConfig.title}
                </Link>
              );
            })}
          </div>

          {/* Row 2: Copyright + Legal */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <span>© 2026 AICodeRally</span>
            <span>•</span>
            <Link href="/legal" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/legal" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/legal" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Support
            </Link>
          </div>

          {/* Row 3: Branding */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <span>An Edge Biz Ops Solution • Powered by </span>
            <span
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
              }}
            >
              AICR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
