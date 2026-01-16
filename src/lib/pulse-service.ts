/**
 * Pulse Service
 * Fetches Channel Insights from AICR Platform Pulse API
 *
 * Note: This service now accepts dynamic tenantId for multi-tenant support.
 * For a more abstracted approach, see src/lib/aicr/client.ts
 */

const AICR_API_BASE = process.env.NEXT_PUBLIC_AICR_API_BASE || 'https://app.aicoderally.com';
const DEFAULT_TENANT_ID = 'ps-edge';

export type PulseUrgency = 'critical' | 'high' | 'medium' | 'low';
export type PulseChief = 'gov' | 'ops' | 'task' | 'kb' | 'summit' | 'strategy';

export interface PulseCard {
  id: string;
  tenantId: string;
  chief: PulseChief;
  title: string;
  summary: string;
  urgency: PulseUrgency;
  source: string;
  createdAt: string;
  dismissedAt?: string | null;
  snoozedUntil?: string | null;
  pursuedAt?: string | null;
}

export interface PulseFeedResponse {
  success: boolean;
  cards: PulseCard[];
  count: number;
  timestamp: string;
}

export interface PulseActionResponse {
  success: boolean;
  message: string;
}

/**
 * Fetch Pulse feed for a tenant
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function getPulseFeed(tenantId: string = DEFAULT_TENANT_ID): Promise<PulseFeedResponse> {
  try {
    const response = await fetch(`${AICR_API_BASE}/api/pulse?tenantId=${tenantId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Pulse API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch Pulse feed:', error);
    return { success: false, cards: [], count: 0, timestamp: new Date().toISOString() };
  }
}

/**
 * Dismiss a Pulse card
 * @param cardId - Card identifier
 * @param reason - Optional reason for dismissal
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function dismissCard(cardId: string, reason?: string, tenantId: string = DEFAULT_TENANT_ID): Promise<PulseActionResponse> {
  try {
    const response = await fetch(`${AICR_API_BASE}/api/pulse/dismiss`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenantId, intentId: cardId, reason }),
    });

    if (!response.ok) {
      throw new Error(`Failed to dismiss card: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to dismiss card:', error);
    return { success: false, message: 'Failed to dismiss card' };
  }
}

/**
 * Snooze a Pulse card
 * @param cardId - Card identifier
 * @param preset - Snooze duration preset
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function snoozeCard(cardId: string, preset: '1_hour' | '4_hours' | 'tomorrow' | 'next_week', tenantId: string = DEFAULT_TENANT_ID): Promise<PulseActionResponse> {
  try {
    const response = await fetch(`${AICR_API_BASE}/api/pulse/snooze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tenantId,
        intentId: cardId,
        snoozePreset: preset,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to snooze card: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to snooze card:', error);
    return { success: false, message: 'Failed to snooze card' };
  }
}

/**
 * Mark a Pulse card as pursued (user took action)
 * @param cardId - Card identifier
 * @param tenantId - Tenant identifier (defaults to 'ps-edge')
 */
export async function pursueCard(cardId: string, tenantId: string = DEFAULT_TENANT_ID): Promise<PulseActionResponse> {
  try {
    const response = await fetch(`${AICR_API_BASE}/api/pulse/pursue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenantId, intentId: cardId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to pursue card: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to pursue card:', error);
    return { success: false, message: 'Failed to pursue card' };
  }
}

/**
 * Get human-readable chief name
 */
export function getChiefName(chief: PulseChief): string {
  const names: Record<PulseChief, string> = {
    gov: 'GovChief',
    ops: 'OpsChief',
    task: 'TaskChief',
    kb: 'KBChief',
    summit: 'SummitChief',
    strategy: 'StrategyChief',
  };
  return names[chief] || chief;
}

/**
 * Get urgency color classes (with dark mode support)
 */
export function getUrgencyColor(urgency: PulseUrgency): string {
  const colors: Record<PulseUrgency, string> = {
    critical: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    high: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    low: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };
  return colors[urgency] || colors.low;
}
