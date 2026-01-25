'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePageTitle } from '@/context/PageTitleContext';
import { PersonIcon, GearIcon, ExitIcon, ChevronDownIcon } from '@radix-ui/react-icons';

/**
 * Navbar Component (SGM Pattern for PS-Edge)
 *
 * Structure matches SGM exactly:
 * Left: [Product Name] [Module Logo PS] | [Module Title] [Subtitle]
 * Right: [Demo Badge] | [User Name/Role + Avatar]
 */
export function Navbar() {
  const { title, description } = usePageTitle();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user info from session
  const rawRole = (session?.user as any)?.role || 'USER';
  const roleDisplay = rawRole === 'ADMIN' ? 'Super User' : rawRole === 'USER' ? 'User' : rawRole;

  const user = {
    name: session?.user?.name || 'User',
    role: roleDisplay,
    email: session?.user?.email || '',
    initials: session?.user?.name?.split(' ').map(n => n[0]).join('') || 'U'
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav
      className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b-4 border-transparent"
      style={{
        borderImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15) 1',
      }}
    >
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Product Name + PS Logo + Module Info */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-4 group">
              {/* Product Name - EDGE with subtitle */}
              <div className="flex flex-col items-center">
                <span
                  className="text-3xl font-bold bg-clip-text text-transparent tracking-tight"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
                  }}
                >
                  EDGE
                </span>
                <span className="text-[8px] text-gray-500 dark:text-gray-400 tracking-widest -mt-1">
                  for Consulting
                </span>
              </div>

              {/* EC Circle Logo */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #9333ea, #c026d3, #facc15)',
                }}
              >
                <span className="text-white font-bold text-xl">EC</span>
              </div>

              {/* Module Info */}
              <div className="border-l border-gray-300 dark:border-gray-700 pl-6">
                <h1
                  className="text-lg font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #9333ea, #c026d3, #db2777, #facc15)',
                  }}
                >
                  {title}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {description}
                </p>
              </div>
            </Link>
          </div>

          {/* Right side: Demo Badge + User Dropdown */}
          <div className="flex items-center gap-4">
            {/* Demo Badge */}
            <div className="flex items-center gap-4">
              <span
                className="px-3 py-1 text-sm font-bold uppercase tracking-wide rounded"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDB813 100%)',
                  color: 'white',
                  boxShadow: '0 2px 4px rgba(255, 107, 53, 0.3)',
                }}
              >
                Demo Data
              </span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #9333ea, #c026d3, #facc15)',
                  }}
                >
                  {user.initials}
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/dashboard/settings/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <PersonIcon className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <GearIcon className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ExitIcon className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
