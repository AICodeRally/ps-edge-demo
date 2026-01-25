/**
 * PS-Edge Module Registry
 *
 * Defines the PS-Edge module configuration for the SPARCC platform.
 * This enables PS-Edge to integrate with the broader SPARCC ecosystem.
 */

import { PS_EDGE_GRADIENT, type SPARCCGradient, type DepartmentColors } from './themes';

/**
 * Module definition for SPARCC platform
 */
export interface ModuleConfig {
  id: string;
  name: string;
  shortName: string;
  description: string;
  gradient: SPARCCGradient;
  modeColors: {
    DESIGN: string;
    OPERATE: string;
    DISPUTE: string;
    OVERSEE: string;
  };
  departments: string[];
  features: string[];
}

/**
 * PS-Edge Module Configuration
 */
export const PS_EDGE_MODULE: ModuleConfig = {
  id: 'ps-edge',
  name: 'Professional Services Edge',
  shortName: 'PS-Edge',
  description: 'Complete professional services platform for consulting firms',
  gradient: PS_EDGE_GRADIENT,
  modeColors: {
    DESIGN: '#9333ea',    // Purple - Design mode
    OPERATE: '#10b981',   // Green - Operate mode
    DISPUTE: '#f59e0b',   // Amber - Dispute mode
    OVERSEE: '#6366f1',   // Indigo - Oversee mode
  },
  departments: [
    'Sales',
    'Delivery',
    'Client Success',
    'Finance',
    'Operations',
    'Partner Portal',
  ],
  features: [
    'Client Management',
    'Engagement Tracking',
    'Proposal Management',
    'Time & Billing',
    'Deliverable Management',
    'Channel Partner Portal',
    'Telemetry & Signals',
    'AI Assistants (OpsChief, AskPS)',
  ],
};

/**
 * Get the active module configuration
 * In PS-Edge, this always returns PS_EDGE_MODULE
 * This function exists for compatibility with the SPARCC platform pattern
 */
export function getActiveModule(): ModuleConfig {
  return PS_EDGE_MODULE;
}

/**
 * Get module by ID
 */
export function getModuleById(id: string): ModuleConfig | null {
  if (id === 'ps-edge') {
    return PS_EDGE_MODULE;
  }
  return null;
}

/**
 * Generate Tailwind-compatible color classes from a hex color
 * Used for dynamic mode coloring
 */
export function generateTailwindClasses(hexColor: string): {
  primary: string;
  secondary: string;
  gradient: string;
  bg: string;
  text: string;
  border: string;
} {
  // For simplicity, we map hex colors to their closest Tailwind equivalents
  const colorMap: Record<string, string> = {
    '#9333ea': 'purple',
    '#10b981': 'emerald',
    '#f59e0b': 'amber',
    '#6366f1': 'indigo',
    '#3b82f6': 'blue',
    '#f97316': 'orange',
    '#14b8a6': 'teal',
    '#6b7280': 'gray',
  };

  const baseName = colorMap[hexColor] || 'purple';

  return {
    primary: `${baseName}-600`,
    secondary: `${baseName}-500`,
    gradient: `from-${baseName}-600 to-${baseName}-400`,
    bg: `bg-${baseName}-50 dark:bg-${baseName}-900/20`,
    text: `text-${baseName}-600 dark:text-${baseName}-400`,
    border: `border-${baseName}-200 dark:border-${baseName}-800`,
  };
}
