'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  HeartIcon,
  RocketIcon,
  PersonIcon,
  FileTextIcon,
  CalendarIcon,
  TargetIcon,
} from '@radix-ui/react-icons';

export interface NavItem {
  label: string;
  path: string;
}

export interface NavSection {
  name: string;
  icon: any;
  color: string;
  items: NavItem[];
  defaultExpanded?: boolean;
}

const NAVIGATION: NavSection[] = [
  {
    name: 'Fundraising',
    icon: HeartIcon,
    color: '#14b8a6',
    defaultExpanded: true,
    items: [
      { label: 'Donors', path: '/dashboard/fundraising' },
      { label: 'Campaigns', path: '/dashboard/fundraising/campaigns' },
      { label: 'Grants', path: '/dashboard/fundraising/grants' },
    ],
  },
  {
    name: 'Programs',
    icon: RocketIcon,
    color: '#22c55e',
    items: [
      { label: 'Programs', path: '/dashboard/programs' },
      { label: 'Projects', path: '/dashboard/programs/projects' },
      { label: 'Impact', path: '/dashboard/programs/impact' },
      { label: 'Budget', path: '/dashboard/programs/budget' },
    ],
  },
  {
    name: 'Volunteers',
    icon: PersonIcon,
    color: '#3b82f6',
    items: [
      { label: 'Roster', path: '/dashboard/volunteers' },
      { label: 'Hours', path: '/dashboard/volunteers/hours' },
      { label: 'Schedule', path: '/dashboard/volunteers/schedule' },
    ],
  },
  {
    name: 'Compliance',
    icon: FileTextIcon,
    color: '#6b7280',
    items: [
      { label: 'Dashboard', path: '/dashboard/compliance' },
      { label: 'Filings', path: '/dashboard/compliance/filings' },
      { label: 'Calendar', path: '/dashboard/compliance/calendar' },
      { label: 'Reports', path: '/dashboard/compliance/reports' },
    ],
  },
  {
    name: 'Events',
    icon: CalendarIcon,
    color: '#f97316',
    items: [
      { label: 'Events', path: '/dashboard/events' },
      { label: 'Community', path: '/dashboard/events/community' },
    ],
  },
  {
    name: 'Beneficiaries',
    icon: TargetIcon,
    color: '#a855f7',
    items: [
      { label: 'Directory', path: '/dashboard/beneficiaries' },
      { label: 'Outcomes', path: '/dashboard/beneficiaries/outcomes' },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('np-edge-nav-expanded');
    if (saved) {
      try {
        setExpandedSections(JSON.parse(saved));
      } catch (e) {
        // Use defaults if parse fails
        setExpandedSections(NAVIGATION.filter(s => s.defaultExpanded).map(s => s.name));
      }
    } else {
      // Use defaults on first load
      setExpandedSections(NAVIGATION.filter(s => s.defaultExpanded).map(s => s.name));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('np-edge-nav-expanded', JSON.stringify(expandedSections));
    }
  }, [expandedSections, mounted]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionName)
        ? prev.filter(n => n !== sectionName)
        : [...prev, sectionName]
    );
  };

  // Don't render navigation until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="animate-pulse space-y-2">
          {NAVIGATION.map((section) => (
            <div key={section.name} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex-1 overflow-y-auto p-4">
      {NAVIGATION.map((section) => {
        const isExpanded = expandedSections.includes(section.name);
        const SectionIcon = section.icon;

        // Check if any item in this section is active
        const hasActiveItem = section.items.some(item => pathname === item.path);

        return (
          <div key={section.name} className="mb-2">
            {/* Section Header - Click to expand/collapse */}
            <button
              onClick={() => toggleSection(section.name)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <SectionIcon style={{ color: section.color }} className="h-5 w-5 flex-shrink-0" />
                <span
                  className="font-semibold text-gray-900 dark:text-gray-100"
                  style={hasActiveItem ? { color: section.color } : {}}
                >
                  {section.name}
                </span>
              </div>
              <ChevronRightIcon
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              />
            </button>

            {/* Sub-items - Show when expanded */}
            {isExpanded && (
              <div className="ml-7 mt-1 space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      style={isActive ? {
                        color: section.color,
                        backgroundColor: `${section.color}15`
                      } : {}}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
