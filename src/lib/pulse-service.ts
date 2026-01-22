/**
 * Pulse Service
 * Fetches operational insights from local Pulse API
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
const TENANT_ID = 'np-edge';

export type PulseUrgency = 'critical' | 'high' | 'medium' | 'low';
export type PulseChief = 'governance' | 'operations' | 'task' | 'knowledge' | 'summit';

export interface PulseCard {
  id: string;
  title: string;
  summary: string;
  urgency: PulseUrgency;
  source: string;
  chiefName: string;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface PulseFeed {
  cards: PulseCard[];
  total: number;
  timestamp: string;
}

/**
 * Fetch the Pulse feed for the tenant
 */
export async function getPulseFeed(): Promise<PulseFeed> {
  try {
    const url = `${API_BASE}/api/pulse?tenantId=${TENANT_ID}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pulse feed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pulse feed:', error);
    return { cards: [], total: 0, timestamp: new Date().toISOString() };
  }
}

/**
 * Dismiss a pulse card
 */
export async function dismissCard(cardId: string, reason?: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/pulse/dismiss`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenantId: TENANT_ID, intentId: cardId, reason }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error dismissing card:', error);
    return false;
  }
}

/**
 * Snooze a pulse card
 */
export async function snoozeCard(cardId: string, preset: '1_hour' | '4_hours' | 'tomorrow' | 'next_week'): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/pulse/snooze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tenantId: TENANT_ID,
        intentId: cardId,
        snoozePreset: preset,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error snoozing card:', error);
    return false;
  }
}

/**
 * Pursue a pulse card (navigate to action)
 */
export async function pursueCard(cardId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/pulse/pursue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tenantId: TENANT_ID, intentId: cardId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error pursuing card:', error);
    return false;
  }
}
