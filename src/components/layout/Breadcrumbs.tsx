'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export function Breadcrumbs() {
  const pathname = usePathname();

  // Parse the pathname to generate breadcrumb segments
  const segments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on home page
  if (segments.length === 0 || pathname === '/') {
    return null;
  }

  // Generate breadcrumb items with proper labels
  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return { href, label, isLast: index === segments.length - 1 };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      {/* Home link */}
      <Link
        href="/dashboard"
        className="flex items-center hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <HomeIcon className="w-4 h-4" />
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.href}>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          {crumb.isLast ? (
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
