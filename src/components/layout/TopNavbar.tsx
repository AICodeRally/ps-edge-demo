'use client';

import { UserDropdown } from './UserDropdown';

/**
 * TopNavbar Component
 *
 * Thin top bar with user dropdown.
 * PS-Edge pages already have their own headers, so this is minimal.
 */
export function TopNavbar() {
  return (
    <nav className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-end">
      <UserDropdown />
    </nav>
  );
}
