'use client';

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

/**
 * Dashboard Layout (SGM Pattern with Full AICR Integration)
 *
 * Architecture:
 * - Sticky navbar at top (z-50) showing client name
 * - Main content area with bottom padding for footer clearance
 * - Fixed footer at bottom (z-40) with 6 P's navigation
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
      <main className="flex-1 pb-24">{children}</main>
      <Footer />

      {/* Global Components */}
      <CommandPalette />
      <WhatsNewModal />

      {/* 5 AI Orbs - Conditionally rendered based on settings */}
      {/* Bottom-left stack */}
      <OpsChiefOrb appName="PS-Edge" enabled={opsChiefEnabled} />
      <PulseOrb enabled={pulseEnabled} />
      <PageKbPanel enabled={pageKbEnabled} />

      {/* Bottom-right stack */}
      <TaskOrb enabled={tasksEnabled} />
      <AskPSOrb appName="PS-Edge" enabled={askPSEnabled} />
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
