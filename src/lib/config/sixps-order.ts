/**
 * 6 P's Order Configuration
 * Allows users to customize the display order of the 6 P's
 */

import type { SixPCategory } from '@/src/types/ps-edge/six-ps.types';

const SIXPS_ORDER_KEY = 'ps-edge-sixps-order';

/**
 * Default 6 P's order
 * Purpose, People, Process, Practice, Pipeline, Performance
 */
export const DEFAULT_SIXPS_ORDER: SixPCategory[] = [
  'PURPOSE',
  'PEOPLE',
  'PROCESS',
  'PRACTICE',
  'PIPELINE',
  'PERFORMANCE',
];

/**
 * Get current 6 P's order from localStorage
 */
export function getSixPsOrder(): SixPCategory[] {
  if (typeof window === 'undefined') {
    return DEFAULT_SIXPS_ORDER;
  }

  try {
    const stored = localStorage.getItem(SIXPS_ORDER_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate that all 6 P's are present
      if (Array.isArray(parsed) && parsed.length === 6) {
        const hasAll = DEFAULT_SIXPS_ORDER.every((p) => parsed.includes(p));
        if (hasAll) {
          return parsed as SixPCategory[];
        }
      }
    }
  } catch (error) {
    console.error('Failed to load 6 Ps order:', error);
  }

  return DEFAULT_SIXPS_ORDER;
}

/**
 * Save 6 P's order to localStorage
 */
export function saveSixPsOrder(order: SixPCategory[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(SIXPS_ORDER_KEY, JSON.stringify(order));
    // Dispatch custom event so components can listen for changes
    window.dispatchEvent(new CustomEvent('sixps-order-changed'));
  } catch (error) {
    console.error('Failed to save 6 Ps order:', error);
  }
}

/**
 * Reset to default order
 */
export function resetSixPsOrder(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(SIXPS_ORDER_KEY);
  window.dispatchEvent(new CustomEvent('sixps-order-changed'));
}
