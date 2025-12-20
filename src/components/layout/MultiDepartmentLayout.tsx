'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TargetIcon,
  RocketIcon,
  HeartIcon,
  BarChartIcon,
  CubeIcon,
  GearIcon,
  PersonIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  MixIcon
} from '@radix-ui/react-icons';
import { Breadcrumbs } from './Breadcrumbs';
import { useTheme } from '@/src/context/ThemeContext';
import { BRAND_CONFIG } from '@/src/config/brand.config';

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface Department {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  dashboardPath?: string;
  items: NavItem[];
}

// Primary Professional Services Departments (show 6Ps dashboards)
const primaryDepartments: Department[] = [
  {
    name: 'Sales',
    icon: TargetIcon,
    color: 'text-dept-sales',
    dashboardPath: '/dashboard/sales',
    items: [
      { name: 'Pipeline', href: '/dashboard/sales/pipeline' },
      { name: 'Proposals', href: '/dashboard/sales/proposals' },
      { name: 'Clients', href: '/dashboard/sales/clients' },
    ],
  },
  {
    name: 'Delivery',
    icon: RocketIcon,
    color: 'text-dept-delivery',
    dashboardPath: '/dashboard/delivery',
    items: [
      { name: 'Engagements', href: '/dashboard/delivery/engagements' },
      { name: 'Deliverables', href: '/dashboard/delivery/deliverables' },
      { name: 'Team', href: '/dashboard/delivery/team' },
    ],
  },
  {
    name: 'Client Success',
    icon: HeartIcon,
    color: 'text-dept-clientSuccess',
    dashboardPath: '/dashboard/client-success',
    items: [
      { name: 'Health Monitor', href: '/dashboard/client-success/health' },
      { name: 'Renewals', href: '/dashboard/client-success/renewals' },
      { name: 'Support', href: '/dashboard/client-success/support' },
      { name: 'Onboarding', href: '/dashboard/client-success/onboarding' },
    ],
  },
  {
    name: 'Finance',
    icon: BarChartIcon,
    color: 'text-dept-finance',
    dashboardPath: '/dashboard/finance',
    items: [
      { name: 'Timesheets', href: '/dashboard/finance/timesheets' },
      { name: 'Invoices', href: '/dashboard/finance/invoices' },
      { name: 'Revenue', href: '/dashboard/finance/revenue' },
    ],
  },
  {
    name: 'Operations',
    icon: MixIcon,
    color: 'text-gray-600 dark:text-gray-400',
    dashboardPath: '/dashboard/operations',
    items: [
      { name: 'Data Management', href: '/dashboard/operations/data' },
      { name: 'Integration Hub', href: '/dashboard/operations/integrations' },
      { name: 'AI Management', href: '/dashboard/operations/ai' },
      { name: 'Document Library', href: '/dashboard/operations/documents' },
      { name: 'Knowledge Library', href: '/dashboard/operations/knowledge' },
      { name: 'Settings', href: '/dashboard/settings' },
    ],
  },
];

// Secondary/Optional Tools
const secondaryDepartments: Department[] = [
  {
    name: 'Partner Portal',
    icon: CubeIcon,
    color: 'text-dept-partnerPortal',
    dashboardPath: '/dashboard/partner-portal',
    items: [
      { name: 'Client Tenants', href: '/dashboard/partner-portal/tenants' },
      { name: 'Commissions', href: '/dashboard/partner-portal/commissions' },
      { name: 'Signals', href: '/dashboard/partner-portal/signals' },
      { name: 'Benchmarks', href: '/dashboard/partner-portal/benchmarks' },
      { name: 'Usage', href: '/dashboard/partner-portal/usage' },
      { name: 'Revenue', href: '/dashboard/partner-portal/revenue' },
    ],
  },
];

export function MultiDepartmentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(
    new Set([...primaryDepartments.map(d => d.name), ...secondaryDepartments.map(d => d.name)])
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleDepartment = (deptName: string) => {
    setExpandedDepartments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(deptName)) {
        newSet.delete(deptName);
      } else {
        newSet.add(deptName);
      }
      return newSet;
    });
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-dark-bg-primary">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-dark-border-default flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-dark-border-default">
          {sidebarOpen ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className={`w-10 h-10 ${BRAND_CONFIG.gradient.bgClassBr} rounded-lg flex items-center justify-center text-white font-bold`}>
                  PS
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">PS-Edge</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Professional Services OS</p>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <Cross1Icon className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="mx-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <HamburgerMenuIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {/* Primary Departments */}
          <div className="mb-4">
            {sidebarOpen && (
              <p className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Professional Services
              </p>
            )}
            {primaryDepartments.map(dept => {
              const Icon = dept.icon;
              const isExpanded = expandedDepartments.has(dept.name);
              const isDeptActive = dept.items.some(item => isActive(item.href));

              return (
                <div key={dept.name} className="mb-2">
                  {/* Department Header */}
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      isActive(dept.dashboardPath || '')
                        ? 'bg-brand-50 dark:bg-brand-900/20'
                        : isDeptActive
                        ? 'bg-gray-100 dark:bg-dark-bg-tertiary'
                        : 'hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'
                    }`}
                  >
                    <Link
                      href={dept.dashboardPath || '#'}
                      className="flex items-center gap-3 flex-1"
                    >
                      <Icon className={`w-5 h-5 ${dept.color}`} />
                      {sidebarOpen && (
                        <span className={`text-sm font-medium ${
                          isActive(dept.dashboardPath || '')
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {dept.name}
                        </span>
                      )}
                    </Link>
                    {sidebarOpen && (
                      <button
                        onClick={() => toggleDepartment(dept.name)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-dark-bg-primary rounded"
                      >
                        {isExpanded ? (
                          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Department Items */}
                  {sidebarOpen && isExpanded && (
                    <div className="mt-1 ml-8 space-y-1">
                      {dept.items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            isActive(item.href)
                              ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary hover:text-gray-900 dark:hover:text-gray-100'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Separator */}
          {sidebarOpen && <div className="h-px bg-gray-200 dark:bg-dark-border-default my-4" />}

          {/* Secondary/Optional Tools */}
          <div>
            {sidebarOpen && (
              <p className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Channel Partner
              </p>
            )}
            {secondaryDepartments.map(dept => {
              const Icon = dept.icon;
              const isExpanded = expandedDepartments.has(dept.name);
              const isDeptActive = dept.items.some(item => isActive(item.href));

              return (
                <div key={dept.name} className="mb-2">
                  {/* Department Header */}
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      isActive(dept.dashboardPath || '')
                        ? 'bg-brand-50 dark:bg-brand-900/20'
                        : isDeptActive
                        ? 'bg-gray-100 dark:bg-dark-bg-tertiary'
                        : 'hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'
                    }`}
                  >
                    <Link
                      href={dept.dashboardPath || '#'}
                      className="flex items-center gap-3 flex-1"
                    >
                      <Icon className={`w-5 h-5 ${dept.color}`} />
                      {sidebarOpen && (
                        <span className={`text-sm font-medium ${
                          isActive(dept.dashboardPath || '')
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {dept.name}
                        </span>
                      )}
                    </Link>
                    {sidebarOpen && (
                      <button
                        onClick={() => toggleDepartment(dept.name)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-dark-bg-primary rounded"
                      >
                        {isExpanded ? (
                          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Department Items */}
                  {sidebarOpen && isExpanded && (
                    <div className="mt-1 ml-8 space-y-1">
                      {dept.items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            isActive(item.href)
                              ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary hover:text-gray-900 dark:hover:text-gray-100'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-dark-border-default p-4">
          {/* User */}
          <div className={`flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border-default`}>
            <PersonIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Demo User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">user@ppg.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-14 bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border-default flex items-center justify-end px-6">
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg ${BRAND_CONFIG.gradient.bgClassBr} text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-sm`}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
