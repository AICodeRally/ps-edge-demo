'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  PersonIcon,
  ChevronDownIcon,
  ExitIcon,
  GearIcon,
} from '@radix-ui/react-icons';

/**
 * UserDropdown Component
 *
 * Displays user avatar with dropdown menu for profile, settings, and sign out.
 * Uses session data from NextAuth.
 */
export function UserDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials for avatar
  const getInitials = (name: string | null | undefined): string => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const user = session?.user;
  const initials = getInitials(user?.name);
  const displayName = user?.name || 'User';
  const email = user?.email || '';
  const role = (user as any)?.role || 'USER';
  const tenantName = (user as any)?.tenantName || 'PS-Edge';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
          style={{
            background: 'linear-gradient(135deg, var(--sparcc-gradient-start), var(--sparcc-gradient-mid1))',
          }}
        >
          {initials}
        </div>

        {/* Name (hidden on small screens) */}
        <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
          {displayName}
        </span>

        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {displayName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {email}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                {role}
              </span>
              <span className="text-xs text-gray-400">
                {tenantName}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                // Navigate to profile (implement when page exists)
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <PersonIcon className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                // Navigate to settings
                window.location.href = '/dashboard/settings';
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <GearIcon className="w-4 h-4" />
              Settings
            </button>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-1">
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <ExitIcon className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
