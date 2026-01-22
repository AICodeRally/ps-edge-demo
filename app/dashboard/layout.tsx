'use client';

import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { SidebarNav } from '@/src/components/layout/SidebarNav';
import { OpsChiefOrb } from '@/src/components/ai/OpsChiefOrb';
import { AskPSOrb } from '@/src/components/ai/AskPSOrb';
import { PulseOrb } from '@/src/components/ai/PulseOrb';
import { TaskOrb } from '@/src/components/ai/TaskOrb';
import { PageKbPanel } from '@/src/components/kb/PageKbPanel';
import { CommandPalette } from '@/src/components/CommandPalette';
import { WhatsNewModal } from '@/src/components/modals/WhatsNewModal';
import { useAIFeature } from '@/src/components/ai/AISettingsProvider';
import { ModulesProvider } from '@/src/contexts/ModulesContext';

/**
 * Dashboard Layout (NP-Edge - PS-Edge Style)
 *
 * Architecture:
 * - Sticky navbar at top (z-50) showing nonprofit name
 * - Left sidebar with collapsible navigation (6 modules, 2-4 sub-pages each)
 * - Main content area with bottom padding for footer clearance
 * - Fixed footer at bottom (z-40) with nonprofit modules navigation
 * - 5 AI Orbs positioned bottom corners (z-40):
 *   - Bottom-left: OpsChief, Pulse, PageKB
 *   - Bottom-right: Tasks, AskPS
 */
function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  // Check individual orb settings
  const opsChiefEnabled = useAIFeature('opsChief');
  const askPSEnabled = useAIFeature('askPS');
  const pulseEnabled = useAIFeature('pulse');
  const tasksEnabled = useAIFeature('tasks');
  const pageKbEnabled = useAIFeature('pageKb');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg-primary" suppressHydrationWarning>
      <Navbar />
      <div className="flex flex-1" suppressHydrationWarning>
        {/* Left Sidebar with Collapsible Navigation */}
        <aside className="w-64 bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-gray-700 flex-shrink-0 flex flex-col">
          {/* Header Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Operations Navigation
            </h2>
          </div>

          {/* Navigation */}
          <SidebarNav />

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">Demo Mode</span>
          </div>
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
