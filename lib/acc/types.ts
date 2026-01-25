/**
 * ACC Types
 *
 * Additional types not covered by contracts.
 */

import { AgentContract, AppRegistry, SyncResult } from './contracts';

/**
 * Dashboard statistics
 */
export interface ACCDashboardStats {
  apps: {
    total: number;
    byTier: Record<string, number>;
    byStatus: Record<string, number>;
  };
  agents: {
    total: number;
    byProvider: Record<string, number>;
    byStatus: Record<string, number>;
    byType: Record<string, number>;
    pendingReview: number;
  };
  sync: {
    lastGlobalSync: Date | null;
    appsNeedingSync: number;
  };
  recentActivity: ActivityItem[];
}

/**
 * Activity item for dashboard
 */
export interface ActivityItem {
  id: string;
  type: 'agent_created' | 'agent_updated' | 'agent_approved' | 'app_synced' | 'app_registered';
  description: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Extended agent with app information
 */
export interface AgentWithApp extends AgentContract {
  id: string;
  appSlug?: string;
  appName?: string;
  filePath?: string;
  lastFileSync?: Date;
}

/**
 * Extended app with agents
 */
export interface AppWithAgents extends AppRegistry {
  agents: Array<{
    id: string;
    slug: string;
    name: string;
    status: string;
  }>;
}

/**
 * Sync summary for dashboard
 */
export interface SyncSummary {
  lastGlobalSync: Date | null;
  apps: Array<{
    id: string;
    slug: string;
    name: string;
    lastSyncAt: Date | null;
    lastSyncStatus: string | null;
    agentCount: number;
  }>;
  totalAgentsSynced: number;
  syncResults?: SyncResult[];
}

/**
 * API response wrapper
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
