/**
 * PS-Edge Professional Services Type Definitions
 * Types for PPG's consulting business operations
 */

// ============================================================================
// CLIENT MANAGEMENT
// ============================================================================

export type ClientType = 'NONPROFIT' | 'FOUNDATION' | 'GOVERNMENT' | 'CORPORATE';
export type ClientStatus = 'PROSPECT' | 'ACTIVE' | 'INACTIVE' | 'CHURNED';

export interface Client {
  id: string;
  tenantId: string;

  // Basic Info
  name: string;
  clientType: ClientType;
  status: ClientStatus;
  taxId?: string;
  website?: string;

  // Business Context
  annualRevenue?: number;
  staffSize?: number;
  focusAreas: string[];

  // Relationship
  primaryContactId: string;
  accountOwnerId: string;
  acquisitionDate?: Date;
  firstEngagementDate?: Date;

  // Channel Partner Flag
  isNPEdgeClient: boolean;
  npEdgeTenantId?: string;
  npEdgeGoLiveDate?: Date;

  // Metadata
  tags: string[];
  customFields?: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// ============================================================================
// PROJECT/ENGAGEMENT MANAGEMENT
// ============================================================================

export type EngagementType =
  | 'CAPITAL_CAMPAIGN'
  | 'STRATEGIC_PLANNING'
  | 'BOARD_DEVELOPMENT'
  | 'GRANT_WRITING'
  | 'FEASIBILITY_STUDY'
  | 'FUNDRAISING_STRATEGY'
  | 'TRAINING_WORKSHOP'
  | 'NPEDGE_IMPLEMENTATION';

export type EngagementStatus =
  | 'PLANNING'
  | 'IN_PROGRESS'
  | 'ON_HOLD'
  | 'COMPLETED'
  | 'CANCELLED';

export type BillingType = 'FIXED_FEE' | 'HOURLY' | 'RETAINER';

export interface Engagement {
  id: string;
  tenantId: string;

  // Basics
  engagementName: string;
  engagementType: EngagementType;
  status: EngagementStatus;
  description: string;
  objectives: string[];

  // Client Relationship
  clientId: string;
  contractId?: string;

  // Timeline
  startDate: Date;
  endDate?: Date;
  estimatedHours: number;
  actualHours?: number;

  // Team
  projectManagerId: string;
  teamMemberIds: string[];

  // Financials
  contractValue: number;
  billingType: BillingType;
  hourlyRate?: number;

  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// PROPOSALS & CONTRACTS
// ============================================================================

export type ProposalStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'NEGOTIATING'
  | 'WON'
  | 'LOST';

export interface Proposal {
  id: string;
  tenantId: string;

  // Basics
  proposalNumber: string;
  title: string;
  clientId: string;

  // Scope
  engagementType: EngagementType;
  scopeOfWork: string;
  assumptions: string[];
  exclusions: string[];

  // Pricing
  proposedValue: number;
  billingType: BillingType;
  estimatedHours: number;
  hourlyRate?: number;

  // Timeline
  proposedStartDate: Date;
  proposedDuration: number; // weeks

  // Lifecycle
  status: ProposalStatus;
  submittedDate?: Date;
  decisionDate?: Date;
  lostReason?: string;

  // Documents
  documentUrl?: string;

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// ============================================================================
// TIME TRACKING & BILLING
// ============================================================================

export type ActivityType =
  | 'CLIENT_MEETING'
  | 'RESEARCH'
  | 'DELIVERABLE_PREP'
  | 'TRAVEL'
  | 'ADMIN'
  | 'TRAINING';

export interface TimeEntry {
  id: string;
  tenantId: string;

  // Who/What/When
  consultantId: string;
  engagementId: string;
  clientId: string;

  // Time
  date: Date;
  hours: number;

  // Activity
  activityType: ActivityType;
  description: string;

  // Billing
  isBillable: boolean;
  billingRate?: number;
  invoiceId?: string;

  createdAt: Date;
  updatedAt: Date;
}

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface Invoice {
  id: string;
  tenantId: string;

  // Invoice Details
  invoiceNumber: string;
  clientId: string;
  engagementId?: string;

  // Amounts
  subtotal: number;
  taxAmount?: number;
  totalAmount: number;
  amountPaid: number;

  // Dates
  invoiceDate: Date;
  dueDate: Date;
  paidDate?: Date;

  // Line Items
  timeEntryIds: string[];
  expenses?: Array<{
    description: string;
    amount: number;
  }>;

  // Status
  status: InvoiceStatus;

  // Payment
  paymentMethod?: string;
  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// DELIVERABLES
// ============================================================================

export type DeliverableType =
  | 'STRATEGY_DOCUMENT'
  | 'FEASIBILITY_REPORT'
  | 'TRAINING_MATERIALS'
  | 'CAMPAIGN_PLAN'
  | 'BOARD_MATERIALS'
  | 'PROGRESS_REPORT';

export type DeliverableStatus = 'PLANNED' | 'IN_PROGRESS' | 'REVIEW' | 'DELIVERED' | 'APPROVED';

export interface Deliverable {
  id: string;
  tenantId: string;

  // Basics
  name: string;
  deliverableType: DeliverableType;
  engagementId: string;

  // Timeline
  dueDate: Date;
  deliveredDate?: Date;
  approvedDate?: Date;

  // Status
  status: DeliverableStatus;
  completionPercentage: number;

  // Content
  description?: string;
  documentUrl?: string;

  // Ownership
  ownerIds: string[];
  reviewerId?: string;

  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// TEAM MEMBERS (PPG Staff/Consultants)
// ============================================================================

export type ConsultantRole =
  | 'MANAGING_DIRECTOR'
  | 'SENIOR_CONSULTANT'
  | 'CONSULTANT'
  | 'ASSOCIATE_CONSULTANT'
  | 'GRANT_WRITER'
  | 'TRAINER';

export interface Consultant {
  id: string;
  tenantId: string;
  personId: string;

  // Professional Info
  role: ConsultantRole;
  title: string;
  department: string;

  // Expertise
  specializations: string[];
  certifications: string[];

  // Capacity
  weeklyCapacityHours: number;
  currentUtilization: number; // Percentage

  // Billing
  defaultBillingRate: number;

  // Status
  isActive: boolean;
  hireDate: Date;

  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// ENGAGEMENT TYPE DISPLAY NAMES
// ============================================================================

export const ENGAGEMENT_TYPE_LABELS: Record<EngagementType, string> = {
  CAPITAL_CAMPAIGN: 'Capital Campaign',
  STRATEGIC_PLANNING: 'Strategic Planning',
  BOARD_DEVELOPMENT: 'Board Development',
  GRANT_WRITING: 'Grant Writing',
  FEASIBILITY_STUDY: 'Feasibility Study',
  FUNDRAISING_STRATEGY: 'Fundraising Strategy',
  TRAINING_WORKSHOP: 'Training Workshop',
  NPEDGE_IMPLEMENTATION: 'NP-Edge Implementation',
};

// ============================================================================
// STATUS COLOR HELPERS
// ============================================================================

export function getEngagementStatusColor(status: EngagementStatus): string {
  switch (status) {
    case 'PLANNING':
      return 'bg-blue-100 text-blue-700';
    case 'IN_PROGRESS':
      return 'bg-green-100 text-green-700';
    case 'ON_HOLD':
      return 'bg-yellow-100 text-yellow-700';
    case 'COMPLETED':
      return 'bg-gray-100 text-gray-700';
    case 'CANCELLED':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getProposalStatusColor(status: ProposalStatus): string {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-100 text-gray-700';
    case 'SUBMITTED':
      return 'bg-blue-100 text-blue-700';
    case 'NEGOTIATING':
      return 'bg-yellow-100 text-yellow-700';
    case 'WON':
      return 'bg-green-100 text-green-700';
    case 'LOST':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getInvoiceStatusColor(status: InvoiceStatus): string {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-100 text-gray-700';
    case 'SENT':
      return 'bg-blue-100 text-blue-700';
    case 'PAID':
      return 'bg-green-100 text-green-700';
    case 'OVERDUE':
      return 'bg-red-100 text-red-700';
    case 'CANCELLED':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
