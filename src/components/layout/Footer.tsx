'use client';

import Link from 'next/link';

/**
 * Footer Component (SGM Pattern)
 *
 * 3 centered rows:
 * - Row 1: AI orbs (3 left, 2 right) + department links
 * - Row 2: Copyright + legal links
 * - Row 3: Branding tagline
 */

/**
 * Mini AI Orb Component for footer
 */
function MiniOrb({
  name,
  gradient
}: {
  name: string;
  gradient: string;
}) {
  return (
    <div
      className="w-5 h-5 rounded-full animate-pulse cursor-pointer hover:scale-110 transition-transform"
      style={{
        background: gradient,
        boxShadow: '0 0 6px rgba(147, 51, 234, 0.4)',
      }}
      title={name}
    />
  );
}

// 5 AI Chiefs - matching SGM
const leftOrbs = [
  { name: 'GovChief', gradient: 'linear-gradient(135deg, #6b21a8, #9333ea)' },
  { name: 'OpsChief', gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
  { name: 'TaskChief', gradient: 'linear-gradient(135deg, #8b5cf6, #c084fc)' },
];

const rightOrbs = [
  { name: 'KBChief', gradient: 'linear-gradient(135deg, #a855f7, #d8b4fe)' },
  { name: 'StrategyChief', gradient: 'linear-gradient(135deg, #c084fc, #e9d5ff)' },
];

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

      <div className="px-4 py-3 space-y-2">
        {/* Row 1: Orbs + Department Links */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          {/* Left Orbs */}
          <div className="flex items-center gap-1.5">
            {leftOrbs.map((orb) => (
              <MiniOrb key={orb.name} name={orb.name} gradient={orb.gradient} />
            ))}
          </div>

          {/* Department Links */}
          <div className="flex items-center gap-1">
            <Link href="/dashboard/sales" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Sales
            </Link>
            <span className="text-gray-300 dark:text-gray-600 mx-1">|</span>
            <Link href="/dashboard/marketing" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Marketing
            </Link>
            <span className="text-gray-300 dark:text-gray-600 mx-1">|</span>
            <Link href="/dashboard/delivery" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Services
            </Link>
            <span className="text-gray-300 dark:text-gray-600 mx-1">|</span>
            <Link href="/dashboard/operations" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Operations
            </Link>
          </div>

          {/* Right Orbs */}
          <div className="flex items-center gap-1.5">
            {rightOrbs.map((orb) => (
              <MiniOrb key={orb.name} name={orb.name} gradient={orb.gradient} />
            ))}
          </div>
        </div>

        {/* Row 2: Copyright + Legal */}
        <div className="flex items-center justify-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <span>© 2026 BHG Consulting</span>
          <span className="mx-1">•</span>
          <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Privacy
          </Link>
          <span className="mx-1">•</span>
          <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Terms
          </Link>
          <span className="mx-1">•</span>
          <Link href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Support
          </Link>
        </div>

        {/* Row 3: Branding */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-500">
          An Edge Biz Ops Solution • Powered by AICR
        </div>
      </div>
    </footer>
  );
}
