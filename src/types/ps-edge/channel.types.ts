/**
 * PS-Edge Channel Partner Type Definitions
 * Types for multi-tenant channel partner portal (monitoring NP-Edge clients)
 */

// ============================================================================
// CHANNEL PARTNER - CLIENT TENANT MANAGEMENT
// ============================================================================

export type TenantHealthLevel = 'CRITICAL' | 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT';
export type TenantTier = 'STARTER' | 'GROWTH' | 'ENTERPRISE';

export interface ClientTenant {
  id: string;
  tenantId: string; // PPG's tenant ID

  // NP-Edge Tenant Info
  npEdgeTenantId: string;
  organizationName: string;

  // Subscription
  tier: TenantTier;
  monthlyFee: number;
  goLiveDate: Date;
  renewalDate?: Date;

  // PPG Relationship
  managingClientId: string; // Links to Client model
  accountOwnerId: string; // PPG staff

  // Health Metrics (from telemetry)
  healthScore?: number; // 0-100
  healthLevel?: TenantHealthLevel;
  lastHealthCheck?: Date;

  // Usage Metrics
  activeUsers?: number;
  storageUsedGB?: number;
  apiCallsThisMonth?: number;

  // Status
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// TELEMETRY & SIGNALS
// ============================================================================

export type SignalSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type SignalCategory =
  | 'CLIENT_HEALTH'
  | 'FEATURE_ADOPTION'
  | 'USER_ENGAGEMENT'
  | 'DATA_QUALITY'
  | 'COMPLIANCE_RISK'
  | 'REVENUE_OPPORTUNITY'
  | 'CHURN_RISK';

export interface ClientSignal {
  id: string;
  tenantId: string; // PPG's tenant ID

  // Source
  clientTenantId: string;
  npEdgeTenantId: string;

  // Signal Details
  category: SignalCategory;
  severity: SignalSeverity;
  title: string;
  description: string;

  // Context
  affectedModule?: string; // e.g., 'Fundraising', 'Volunteers'
  detectedValue?: number;
  thresholdValue?: number;

  // Action
  suggestedAction?: string;
  isResolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;

  // Metadata
  metadata?: Record<string, any>;

  emittedAt: Date;
  expiresAt?: Date;
}

// ============================================================================
// BENCHMARKS & ANALYTICS
// ============================================================================

export type BenchmarkMetric =
  | 'AVG_DONATION_AMOUNT'
  | 'DONOR_RETENTION_RATE'
  | 'VOLUNTEER_HOURS_PER_MONTH'
  | 'GRANT_APPROVAL_RATE'
  | 'PROGRAM_CAPACITY_UTILIZATION'
  | 'USER_ADOPTION_RATE';

export interface ClientBenchmark {
  id: string;
  tenantId: string; // PPG's tenant ID

  // Metric
  metric: BenchmarkMetric;
  periodStart: Date;
  periodEnd: Date;

  // Aggregated Data
  portfolioAverage: number;
  portfolioMedian: number;
  portfolioP25: number; // 25th percentile
  portfolioP75: number; // 75th percentile

  // Sample Size
  clientCount: number;

  // Breakdown by Tier (optional)
  byTierData?: {
    starter?: number;
    growth?: number;
    enterprise?: number;
  };

  calculatedAt: Date;
}

export interface ClientPerformance {
  clientTenantId: string;
  npEdgeTenantId: string;
  organizationName: string;

  // Key Metrics
  metrics: Array<{
    metric: BenchmarkMetric;
    value: number;
    portfolioAverage: number;
    percentile: number; // Where they rank (0-100)
    trend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  }>;

  // Overall
  overallHealthScore: number;
  healthLevel: TenantHealthLevel;

  calculatedAt: Date;
}

// ============================================================================
// PARTNER REVENUE
// ============================================================================

export type RevenueType =
  | 'SUBSCRIPTION_FEE'
  | 'IMPLEMENTATION_FEE'
  | 'SUPPORT_FEE'
  | 'TRAINING_FEE'
  | 'COMMISSION';

export interface PartnerRevenue {
  id: string;
  tenantId: string; // PPG's tenant ID

  // Source
  clientTenantId: string;

  // Revenue Details
  revenueType: RevenueType;
  amount: number;
  currency: string; // 'USD'

  // Period
  periodStart: Date;
  periodEnd: Date;

  // Recognition
  recognizedDate: Date;
  invoiceId?: string;

  createdAt: Date;
}

// ============================================================================
// API USAGE LOGGING
// ============================================================================

export interface ApiUsageLog {
  id: string;
  tenantId: string; // PPG's tenant ID

  // Source
  clientTenantId: string;
  npEdgeTenantId: string;

  // Usage
  endpoint: string;
  method: string;
  statusCode: number;

  // Timing
  timestamp: Date;
  responseTimeMs: number;

  // Volume
  requestCount: number; // Aggregated count if batched
}

// ============================================================================
// TELEMETRY INGESTION PAYLOAD (for API endpoint)
// ============================================================================

export interface TelemetrySignalPayload {
  npEdgeTenantId: string;
  category: SignalCategory;
  severity: SignalSeverity;
  title: string;
  description: string;
  affectedModule?: string;
  detectedValue?: number;
  thresholdValue?: number;
  suggestedAction?: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// DISPLAY LABELS
// ============================================================================

export const BENCHMARK_METRIC_LABELS: Record<BenchmarkMetric, string> = {
  AVG_DONATION_AMOUNT: 'Avg Donation Amount',
  DONOR_RETENTION_RATE: 'Donor Retention Rate',
  VOLUNTEER_HOURS_PER_MONTH: 'Volunteer Hours/Month',
  GRANT_APPROVAL_RATE: 'Grant Approval Rate',
  PROGRAM_CAPACITY_UTILIZATION: 'Program Capacity Utilization',
  USER_ADOPTION_RATE: 'User Adoption Rate',
};

export const SIGNAL_CATEGORY_LABELS: Record<SignalCategory, string> = {
  CLIENT_HEALTH: 'Client Health',
  FEATURE_ADOPTION: 'Feature Adoption',
  USER_ENGAGEMENT: 'User Engagement',
  DATA_QUALITY: 'Data Quality',
  COMPLIANCE_RISK: 'Compliance Risk',
  REVENUE_OPPORTUNITY: 'Revenue Opportunity',
  CHURN_RISK: 'Churn Risk',
};

// ============================================================================
// COLOR HELPERS
// ============================================================================

export function getHealthLevelColor(level: TenantHealthLevel): string {
  switch (level) {
    case 'EXCELLENT':
      return 'bg-health-excellent text-white';
    case 'GOOD':
      return 'bg-health-good text-white';
    case 'FAIR':
      return 'bg-health-fair text-gray-900';
    case 'POOR':
      return 'bg-health-poor text-white';
    case 'CRITICAL':
      return 'bg-health-critical text-white';
    default:
      return 'bg-gray-400 text-white';
  }
}

export function getSeverityColor(severity: SignalSeverity): string {
  switch (severity) {
    case 'CRITICAL':
      return 'bg-signal-critical text-white';
    case 'HIGH':
      return 'bg-signal-high text-white';
    case 'MEDIUM':
      return 'bg-signal-medium text-gray-900';
    case 'LOW':
      return 'bg-signal-low text-white';
    default:
      return 'bg-gray-400 text-white';
  }
}

export function getCategoryIcon(category: SignalCategory): string {
  switch (category) {
    case 'CLIENT_HEALTH':
      return '❤️';
    case 'FEATURE_ADOPTION':
      return '🚀';
    case 'USER_ENGAGEMENT':
      return '👥';
    case 'DATA_QUALITY':
      return '📊';
    case 'COMPLIANCE_RISK':
      return '⚠️';
    case 'REVENUE_OPPORTUNITY':
      return '💰';
    case 'CHURN_RISK':
      return '🔔';
    default:
      return '📌';
  }
}

// ============================================================================
// HEALTH SCORE CALCULATION
// ============================================================================

export function calculateHealthLevel(score: number): TenantHealthLevel {
  if (score >= 90) return 'EXCELLENT';
  if (score >= 75) return 'GOOD';
  if (score >= 60) return 'FAIR';
  if (score >= 40) return 'POOR';
  return 'CRITICAL';
}

export function getHealthScoreChange(signal: ClientSignal): number {
  // Calculate how much this signal should affect health score
  const severityPenalty: Record<SignalSeverity, number> = {
    CRITICAL: -10,
    HIGH: -5,
    MEDIUM: -2,
    LOW: -1,
  };

  return severityPenalty[signal.severity] || 0;
}
