/**
 * AICR Platform Types
 *
 * Type definitions for AICR API interactions
 */

/**
 * Request context for AICR API calls
 */
export interface AICRRequestContext {
  tenantId: string;
  userId?: string;
}

/**
 * AskPS Request - Conversational AI query
 */
export interface AskPSRequest {
  message: string;
  domain?: 'ps-edge' | 'operations' | 'channel';
  intent?: 'task_create' | 'pulse_query' | 'client_insight' | 'general';
  context?: {
    clientId?: string;
    engagementId?: string;
    currentPage?: string;
  };
  tenantId?: string;
}

/**
 * AskPS Response
 */
export interface AskPSResponse {
  success: boolean;
  message: string;
  data?: {
    suggestions?: string[];
    relatedEntities?: Array<{
      type: string;
      id: string;
      name: string;
    }>;
    action?: {
      type: string;
      payload: Record<string, unknown>;
    };
  };
  error?: string;
}

/**
 * Pulse Feed Request
 */
export interface PulseFeedRequest {
  tenantId: string;
  chiefs?: string[];
  urgency?: string[];
  limit?: number;
}

/**
 * Pulse Action Request
 */
export interface PulseActionRequest {
  tenantId: string;
  intentId: string;
  reason?: string;
  snoozePreset?: '1_hour' | '4_hours' | 'tomorrow' | 'next_week';
}

/**
 * Task List Request
 */
export interface TaskListRequest {
  tenantId: string;
  status?: string;
  priority?: string;
  assigneeId?: string;
  category?: string;
}

/**
 * Generic API Response
 */
export interface AICRApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
