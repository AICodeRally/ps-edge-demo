'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/src/context/ThemeContext';
import { UserDropdown } from './UserDropdown';
import { Breadcrumbs } from './Breadcrumbs';
import { SIX_PS_DEFINITIONS, type SixPCategory } from '@/src/types/ps-edge/six-ps.types';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

/**
 * Navbar Component (SGM Pattern)
 *
 * Sticky top navigation with:
 * - PS logo + branding (left)
 * - Breadcrumbs showing current P (center)
 * - Theme toggle + User dropdown (right)
 * - Gradient border (bottom)
 *
 * Replaces MultiDepartmentLayout sidebar for mobile-first design.
 */

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Determine active P from pathname
  const getActiveSixP = (): { category: SixPCategory; config: typeof SIX_PS_DEFINITIONS[SixPCategory] } | null => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length < 2) return null; // Not in a P section

    const pSegment = pathSegments[1]; // /dashboard/[p]/...
    const pMap: Record<string, SixPCategory> = {
      'people': 'PEOPLE',
      'process': 'PROCESS',
      'platform': 'PLATFORM',
      'performance': 'PERFORMANCE',
      'profit': 'PROFIT',
      'purpose': 'PURPOSE',
    };

    const category = pMap[pSegment];
    if (!category) return null;

    return {
      category,
      config: SIX_PS_DEFINITIONS[category],
    };
  };

  const activeSixP = getActiveSixP();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Gradient Border (top) */}
      <div
        className="h-0.5 w-full"
        style={{
          background: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
        }}
      />

      <div className="px-4 h-14 flex items-center justify-between">
        {/* Left: Logo + Branding */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <button
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold hover:opacity-90 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, #9333ea, #c026d3, #facc15)',
              }}
              title="PS-Edge"
            >
              PS
            </button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                PS-Edge
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Professional Services
              </p>
            </div>
          </Link>

          {/* Active P Indicator */}
          {activeSixP && (
            <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className={`px-3 py-1 rounded-md ${activeSixP.config.bgColor} ${activeSixP.config.borderColor} border`}>
                <span className={`text-sm font-semibold ${activeSixP.config.color}`}>
                  {activeSixP.config.title}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center: Breadcrumbs */}
        <div className="hidden lg:block flex-1 mx-8">
          <Breadcrumbs />
        </div>

        {/* Right: Theme Toggle + User */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* User Dropdown */}
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
