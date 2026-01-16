import type { PulseCard, PulseFeedResponse, PulseActionResponse } from '../contracts/pulse.contract';

/**
 * Pulse Port Interface
 *
 * Defines operations for the AICR Pulse feed.
 */
export interface IPulsePort {
  /**
   * Get Pulse feed for the current tenant
   */
  getPulseFeed(): Promise<PulseFeedResponse>;

  /**
   * Dismiss a Pulse card
   */
  dismissCard(cardId: string, reason?: string): Promise<PulseActionResponse>;

  /**
   * Snooze a Pulse card
   */
  snoozeCard(cardId: string, preset: '1_hour' | '4_hours' | 'tomorrow' | 'next_week'): Promise<PulseActionResponse>;

  /**
   * Mark a card as pursued (user took action)
   */
  pursueCard(cardId: string): Promise<PulseActionResponse>;
}
