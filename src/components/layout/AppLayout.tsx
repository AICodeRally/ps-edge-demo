'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  MoonIcon,
  SunIcon,
  PersonIcon,
  GearIcon,
  ExitIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  DashboardIcon,
  RocketIcon,
  HeartIcon,
  PersonIcon as VolunteerIcon,
  TargetIcon,
  FileTextIcon,
  CalendarIcon,
  ActivityLogIcon,
  CheckboxIcon,
} from '@radix-ui/react-icons';
import { OpsChiefOrb } from '@/src/components/ai/OpsChiefOrb';
import { AskPSOrb } from '@/src/components/ai/AskPSOrb';
import { PulseOrb } from '@/src/components/ai/PulseOrb';
import { TaskOrb } from '@/src/components/ai/TaskOrb';
import { PageKbPanel } from '@/src/components/kb/PageKbPanel';
import { useAIFeature } from '@/src/components/ai/AISettingsProvider';

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { name: 'Programs', path: '/dashboard/programs', icon: RocketIcon },
  { name: 'Fundraising', path: '/dashboard/fundraising', icon: HeartIcon },
  { name: 'Volunteers', path: '/dashboard/volunteers', icon: VolunteerIcon },
  { name: 'Beneficiaries', path: '/dashboard/beneficiaries', icon: TargetIcon },
  { name: 'Compliance', path: '/dashboard/compliance', icon: FileTextIcon },
  { name: 'Events', path: '/dashboard/events', icon: CalendarIcon },
  { name: 'Pulse', path: '/dashboard/pulse', icon: ActivityLogIcon },
  { name: 'Tasks', path: '/dashboard/tasks', icon: CheckboxIcon },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check individual AI orb settings
  const opsChiefEnabled = useAIFeature('opsChief');
  const askPSEnabled = useAIFeature('askPS');
  const pulseEnabled = useAIFeature('pulse');
  const tasksEnabled = useAIFeature('tasks');
  const pageKbEnabled = useAIFeature('pageKb');

  const userName = session?.user?.name || 'Demo User';
  const userEmail = session?.user?.email || '';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'DU';

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg-primary">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 transition-transform lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-teal-500 text-white font-bold text-lg">
            AF
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">NP-Edge</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">AFFCF Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path as any}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p className="font-medium">Demo Mode</p>
            <p>Synthetic Data</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary px-4">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <Cross1Icon className="h-5 w-5" />
              ) : (
                <HamburgerMenuIcon className="h-5 w-5" />
              )}
            </button>

            {/* Page Title */}
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {navigation.find((item) => item.path === pathname)?.name || 'NP-Edge'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2"
              >
                <div className="hidden md:flex flex-col items-end">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail || 'Administrator'}</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-semibold">
                  {userInitials}
                </div>
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-secondary py-1 shadow-lg z-40">
                    <Link
                      href="/dashboard/settings/profile"
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <PersonIcon className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <GearIcon className="h-4 w-4" />
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ExitIcon className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>

      {/* 5 AI Orbs - Fixed Positioning (conditionally rendered) */}
      {/* Bottom-left stack */}
      <OpsChiefOrb appName="NP-Edge" enabled={opsChiefEnabled} />
      <PulseOrb enabled={pulseEnabled} />
      <PageKbPanel enabled={pageKbEnabled} />

      {/* Bottom-right stack */}
      <TaskOrb enabled={tasksEnabled} />
      <AskPSOrb appName="NP-Edge" enabled={askPSEnabled} />
    </div>
  );
}
