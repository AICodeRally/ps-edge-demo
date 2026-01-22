'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { OpsChiefOrb } from '@/src/components/ai/OpsChiefOrb';
import { AskPSOrb } from '@/src/components/ai/AskPSOrb';
import { PulseOrb } from '@/src/components/ai/PulseOrb';
import { TaskOrb } from '@/src/components/ai/TaskOrb';
import { PageKbPanel } from '@/src/components/kb/PageKbPanel';
import { CommandPalette } from '@/src/components/CommandPalette';
import { WhatsNewModal } from '@/src/components/modals/WhatsNewModal';
import { useAIFeature } from '@/src/components/ai/AISettingsProvider';
import { ModulesProvider } from '@/src/contexts/ModulesContext';

// Sidebar Link Component
function SidebarLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {children}
    </Link>
  );
}

/**
 * Dashboard Layout (NP-Edge - PS-Edge Style)
 *
 * Architecture:
 * - Sticky navbar at top (z-50) showing nonprofit name
 * - Main content area with bottom padding for footer clearance
 * - Fixed footer at bottom (z-40) with nonprofit modules navigation
 * - 5 AI Orbs positioned bottom corners (z-40):
 *   - Bottom-left: OpsChief, Pulse, PageKB
 *   - Bottom-right: Tasks, AskPS
 *
 * No sidebar - mobile-first design with footer-based navigation.
 */
function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  // Check individual orb settings
  const opsChiefEnabled = useAIFeature('opsChief');
  const askPSEnabled = useAIFeature('askPS');
  const pulseEnabled = useAIFeature('pulse');
  const tasksEnabled = useAIFeature('tasks');
  const pageKbEnabled = useAIFeature('pageKb');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
      <Navbar />
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
          <nav className="p-4 space-y-1">
            <SidebarLink href="/dashboard/programs" icon="🎯">Programs</SidebarLink>
            <SidebarLink href="/dashboard/fundraising" icon="💚">Fundraising</SidebarLink>
            <SidebarLink href="/dashboard/volunteers" icon="👥">Volunteers</SidebarLink>
            <SidebarLink href="/dashboard/beneficiaries" icon="🎓">Beneficiaries</SidebarLink>
            <SidebarLink href="/dashboard/compliance" icon="📋">Compliance</SidebarLink>
            <SidebarLink href="/dashboard/events" icon="📅">Events</SidebarLink>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 pb-24 overflow-auto">{children}</main>
      </div>
      <Footer />

      {/* Global Components */}
      <CommandPalette />
      <WhatsNewModal />

      {/* 5 AI Orbs - Conditionally rendered based on settings */}
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModulesProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ModulesProvider>
  );
}
