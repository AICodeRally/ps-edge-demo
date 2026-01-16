/**
 * AICR Client - Platform API Abstraction
 *
 * Centralized client for all AICR Platform API interactions.
 * Provides typed methods for Pulse, Tasks, and AskPS endpoints.
 */

import type {
  AICRRequestContext,
  AskPSRequest,
  AskPSResponse,
  PulseFeedRequest,
  PulseActionRequest,
  TaskListRequest,
} from './types';

import type { PulseCard, PulseFeedResponse, PulseActionResponse } from '../contracts/pulse.contract';
import type { Task } from '../task-service';

const AICR_API_BASE = process.env.NEXT_PUBLIC_AICR_API_BASE || 'https://app.aicoderally.com';

/**
 * AICR Platform Client
 *
 * Usage:
 *   const client = new AICRClient({ tenantId: 'ps-edge' });
 *   const feed = await client.getPulseFeed();
 *   const tasks = await client.getTasks();
 */
export class AICRClient {
  private tenantId: string;
  private userId?: string;
  private apiBase: string;

  constructor(context: AICRRequestContext) {
    this.tenantId = context.tenantId;
    this.userId = context.userId;
    this.apiBase = AICR_API_BASE;
  }

  /**
   * Get the tenant ID
   */
  getTenantId(): string {
    return this.tenantId;
  }

  /**
   * Common fetch wrapper with error handling
   */
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T | null> {
    try {
      const response = await fetch(`${this.apiBase}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': this.tenantId,
          ...(this.userId && { 'x-user-id': this.userId }),
          ...options.headers,
        },
      });

      if (!response.ok) {
        console.error(`AICR API error: ${response.status} ${response.statusText}`);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error('AICR API request failed:', error);
      return null;
    }
  }

  // =========================================================================
  // AskPS - Conversational AI
  // =========================================================================

  /**
   * Send a query to AskPS conversational AI
   */
  async askPS(request: AskPSRequest): Promise<AskPSResponse> {
    const result = await this.fetch<AskPSResponse>('/api/askps', {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        tenantId: this.tenantId,
      }),
    });

    return result || {
      success: false,
      message: 'Failed to get response',
      error: 'Request failed',
    };
  }

  // =========================================================================
  // Pulse - Channel Insights Feed
  // =========================================================================

  /**
   * Get Pulse feed for the tenant
   */
  async getPulseFeed(options?: Partial<PulseFeedRequest>): Promise<PulseFeedResponse> {
    const params = new URLSearchParams({ tenantId: this.tenantId });

    if (options?.chiefs) params.set('chiefs', options.chiefs.join(','));
    if (options?.urgency) params.set('urgency', options.urgency.join(','));
    if (options?.limit) params.set('limit', String(options.limit));

    const result = await this.fetch<PulseFeedResponse>(`/api/pulse?${params}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return result || {
      success: false,
      cards: [],
      count: 0,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Dismiss a Pulse card
   */
  async dismissPulseCard(cardId: string, reason?: string): Promise<PulseActionResponse> {
    const result = await this.fetch<PulseActionResponse>('/api/pulse/dismiss', {
      method: 'POST',
      body: JSON.stringify({
        tenantId: this.tenantId,
        intentId: cardId,
        reason,
      }),
    });

    return result || { success: false, message: 'Failed to dismiss card' };
  }

  /**
   * Snooze a Pulse card
   */
  async snoozePulseCard(
    cardId: string,
    preset: '1_hour' | '4_hours' | 'tomorrow' | 'next_week'
  ): Promise<PulseActionResponse> {
    const result = await this.fetch<PulseActionResponse>('/api/pulse/snooze', {
      method: 'POST',
      body: JSON.stringify({
        tenantId: this.tenantId,
        intentId: cardId,
        snoozePreset: preset,
      }),
    });

    return result || { success: false, message: 'Failed to snooze card' };
  }

  /**
   * Mark a Pulse card as pursued
   */
  async pursuePulseCard(cardId: string): Promise<PulseActionResponse> {
    const result = await this.fetch<PulseActionResponse>('/api/pulse/pursue', {
      method: 'POST',
      body: JSON.stringify({
        tenantId: this.tenantId,
        intentId: cardId,
      }),
    });

    return result || { success: false, message: 'Failed to pursue card' };
  }

  // =========================================================================
  // Tasks - Task Management
  // =========================================================================

  /**
   * Get tasks for the tenant
   */
  async getTasks(options?: Partial<TaskListRequest>): Promise<Task[]> {
    const params = new URLSearchParams();

    if (options?.status) params.set('status', options.status);
    if (options?.priority) params.set('priority', options.priority);
    if (options?.assigneeId) params.set('assigneeId', options.assigneeId);
    if (options?.category) params.set('category', options.category);

    const url = `/api/tasks${params.toString() ? `?${params}` : ''}`;
    const result = await this.fetch<{ tasks: Task[] }>(url, {
      method: 'GET',
      cache: 'no-store',
    });

    return result?.tasks || [];
  }

  /**
   * Get a single task by ID
   */
  async getTask(taskId: string): Promise<Task | null> {
    const result = await this.fetch<{ task: Task }>(`/api/tasks/${taskId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    return result?.task || null;
  }

  /**
   * Create a new task
   */
  async createTask(input: Partial<Task>): Promise<Task | null> {
    const result = await this.fetch<{ task: Task }>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(input),
    });

    return result?.task || null;
  }

  /**
   * Update a task
   */
  async updateTask(taskId: string, input: Partial<Task>): Promise<Task | null> {
    const result = await this.fetch<{ task: Task }>(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });

    return result?.task || null;
  }

  /**
   * Delete a task
   */
  async deleteTask(taskId: string): Promise<boolean> {
    const result = await this.fetch<{ success: boolean }>(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    return result?.success || false;
  }
}

/**
 * Create a client instance with default tenant
 * Used for server-side calls or when session is not available
 */
export function createAICRClient(tenantId: string = 'ps-edge'): AICRClient {
  return new AICRClient({ tenantId });
}

/**
 * Default client instance (for backward compatibility)
 */
export const defaultClient = createAICRClient('ps-edge');
