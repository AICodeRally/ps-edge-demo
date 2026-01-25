import type { Engagement, CreateEngagement, UpdateEngagement, EngagementFilters } from '../contracts/engagement.contract';

/**
 * Engagement Port Interface
 *
 * Defines operations for engagement/project management.
 */
export interface IEngagementPort {
  /**
   * Get all engagements, optionally filtered
   */
  getEngagements(filters?: EngagementFilters): Promise<Engagement[]>;

  /**
   * Get a single engagement by ID
   */
  getEngagement(id: string): Promise<Engagement | null>;

  /**
   * Get engagements for a specific client
   */
  getEngagementsByClient(clientId: string): Promise<Engagement[]>;

  /**
   * Create a new engagement
   */
  createEngagement(data: CreateEngagement): Promise<Engagement>;

  /**
   * Update an existing engagement
   */
  updateEngagement(id: string, data: UpdateEngagement): Promise<Engagement>;

  /**
   * Delete an engagement
   */
  deleteEngagement(id: string): Promise<boolean>;
}
