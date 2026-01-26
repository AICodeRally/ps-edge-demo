'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageKbPanel } from '@/components/kb/PageKbPanel';
import { CommandPalette } from '@/components/CommandPalette';
import { WhatsNewModal } from '@/components/modals/WhatsNewModal';
import { useAIFeature } from '@/components/ai/AISettingsProvider';
import { ModulesProvider } from '@/contexts/ModulesContext';

// @aicr/orbs package - AI Dock with macOS-style UI
import { OrbProvider, AIDock } from '@aicr/orbs';
import orbManifest from '../../orb-manifest.json';

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
  const pageKbEnabled = useAIFeature('pageKb');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
      <Navbar />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />

      {/* Global Components */}
      <CommandPalette />
      <WhatsNewModal />

      {/* AI Dock - macOS-style unified orb interface from @aicr/orbs */}
      <OrbProvider manifest={orbManifest as any}>
        <AIDock />
      </OrbProvider>

      {/* Page KB Panel - remains separate as it's a slide-out panel */}
      <PageKbPanel enabled={pageKbEnabled} />
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
